import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ReechargeInfo } from './reecharge-info.model';
import { ReechargeInfoService } from './reecharge-info.service';

@Injectable()
export class ReechargeInfoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private reechargeInfoService: ReechargeInfoService

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
                this.reechargeInfoService.find(id)
                    .subscribe((reechargeInfoResponse: HttpResponse<ReechargeInfo>) => {
                        const reechargeInfo: ReechargeInfo = reechargeInfoResponse.body;
                        this.ngbModalRef = this.reechargeInfoModalRef(component, reechargeInfo);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.reechargeInfoModalRef(component, new ReechargeInfo());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    reechargeInfoModalRef(component: Component, reechargeInfo: ReechargeInfo): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.reechargeInfo = reechargeInfo;
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
