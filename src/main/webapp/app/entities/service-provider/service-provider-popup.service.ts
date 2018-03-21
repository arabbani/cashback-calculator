import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ServiceProvider } from './service-provider.model';
import { ServiceProviderService } from './service-provider.service';

@Injectable()
export class ServiceProviderPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private serviceProviderService: ServiceProviderService

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
                this.serviceProviderService.find(id)
                    .subscribe((serviceProviderResponse: HttpResponse<ServiceProvider>) => {
                        const serviceProvider: ServiceProvider = serviceProviderResponse.body;
                        this.ngbModalRef = this.serviceProviderModalRef(component, serviceProvider);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.serviceProviderModalRef(component, new ServiceProvider());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    serviceProviderModalRef(component: Component, serviceProvider: ServiceProvider): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.serviceProvider = serviceProvider;
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
