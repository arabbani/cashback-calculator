import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { AffiliateCredential } from './affiliate-credential.model';
import { AffiliateCredentialService } from './affiliate-credential.service';

@Injectable()
export class AffiliateCredentialPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private affiliateCredentialService: AffiliateCredentialService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.affiliateCredentialService.find(id)
                    .subscribe((affiliateCredentialResponse: HttpResponse<AffiliateCredential>) => {
                        const affiliateCredential: AffiliateCredential = affiliateCredentialResponse.body;
                        this.ngbModalRef = this.affiliateCredentialModalRef(component, affiliateCredential);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.affiliateCredentialModalRef(component, new AffiliateCredential());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    affiliateCredentialModalRef(component: Component, affiliateCredential: AffiliateCredential): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.affiliateCredential = affiliateCredential;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
