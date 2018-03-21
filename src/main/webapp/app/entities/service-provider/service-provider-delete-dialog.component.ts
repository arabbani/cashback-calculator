import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ServiceProvider } from './service-provider.model';
import { ServiceProviderPopupService } from './service-provider-popup.service';
import { ServiceProviderService } from './service-provider.service';

@Component({
    selector: 'apsstr-service-provider-delete-dialog',
    templateUrl: './service-provider-delete-dialog.component.html'
})
export class ServiceProviderDeleteDialogComponent {

    serviceProvider: ServiceProvider;

    constructor(
        private serviceProviderService: ServiceProviderService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.serviceProviderService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'serviceProviderListModification',
                content: 'Deleted an serviceProvider'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'apsstr-service-provider-delete-popup',
    template: ''
})
export class ServiceProviderDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private serviceProviderPopupService: ServiceProviderPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.serviceProviderPopupService
                .open(ServiceProviderDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
