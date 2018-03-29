import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ReturnExtras } from './return-extras.model';
import { ReturnExtrasService } from './return-extras.service';

@Injectable()
export class ReturnExtrasPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private returnExtrasService: ReturnExtrasService

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
                this.returnExtrasService.find(id)
                    .subscribe((returnExtrasResponse: HttpResponse<ReturnExtras>) => {
                        const returnExtras: ReturnExtras = returnExtrasResponse.body;
                        this.ngbModalRef = this.returnExtrasModalRef(component, returnExtras);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.returnExtrasModalRef(component, new ReturnExtras());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    returnExtrasModalRef(component: Component, returnExtras: ReturnExtras): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.returnExtras = returnExtras;
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
