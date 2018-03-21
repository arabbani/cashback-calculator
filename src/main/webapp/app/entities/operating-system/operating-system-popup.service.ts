import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { OperatingSystem } from './operating-system.model';
import { OperatingSystemService } from './operating-system.service';

@Injectable()
export class OperatingSystemPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private operatingSystemService: OperatingSystemService

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
                this.operatingSystemService.find(id)
                    .subscribe((operatingSystemResponse: HttpResponse<OperatingSystem>) => {
                        const operatingSystem: OperatingSystem = operatingSystemResponse.body;
                        this.ngbModalRef = this.operatingSystemModalRef(component, operatingSystem);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.operatingSystemModalRef(component, new OperatingSystem());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    operatingSystemModalRef(component: Component, operatingSystem: OperatingSystem): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.operatingSystem = operatingSystem;
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
