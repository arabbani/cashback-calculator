import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { OperatingSystemType } from './operating-system-type.model';
import { OperatingSystemTypeService } from './operating-system-type.service';

@Injectable()
export class OperatingSystemTypePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private operatingSystemTypeService: OperatingSystemTypeService

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
                this.operatingSystemTypeService.find(id)
                    .subscribe((operatingSystemTypeResponse: HttpResponse<OperatingSystemType>) => {
                        const operatingSystemType: OperatingSystemType = operatingSystemTypeResponse.body;
                        this.ngbModalRef = this.operatingSystemTypeModalRef(component, operatingSystemType);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.operatingSystemTypeModalRef(component, new OperatingSystemType());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    operatingSystemTypeModalRef(component: Component, operatingSystemType: OperatingSystemType): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.operatingSystemType = operatingSystemType;
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
