import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { OfferPolicy } from './offer-policy.model';
import { OfferPolicyService } from './offer-policy.service';

@Injectable()
export class OfferPolicyPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private offerPolicyService: OfferPolicyService

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
                this.offerPolicyService.find(id)
                    .subscribe((offerPolicyResponse: HttpResponse<OfferPolicy>) => {
                        const offerPolicy: OfferPolicy = offerPolicyResponse.body;
                        this.ngbModalRef = this.offerPolicyModalRef(component, offerPolicy);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.offerPolicyModalRef(component, new OfferPolicy());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    offerPolicyModalRef(component: Component, offerPolicy: OfferPolicy): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.offerPolicy = offerPolicy;
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
