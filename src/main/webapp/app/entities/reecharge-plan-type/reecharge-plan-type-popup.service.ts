import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ReechargePlanType } from './reecharge-plan-type.model';
import { ReechargePlanTypeService } from './reecharge-plan-type.service';

@Injectable()
export class ReechargePlanTypePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private reechargePlanTypeService: ReechargePlanTypeService

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
                this.reechargePlanTypeService.find(id)
                    .subscribe((reechargePlanTypeResponse: HttpResponse<ReechargePlanType>) => {
                        const reechargePlanType: ReechargePlanType = reechargePlanTypeResponse.body;
                        this.ngbModalRef = this.reechargePlanTypeModalRef(component, reechargePlanType);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.reechargePlanTypeModalRef(component, new ReechargePlanType());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    reechargePlanTypeModalRef(component: Component, reechargePlanType: ReechargePlanType): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.reechargePlanType = reechargePlanType;
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
