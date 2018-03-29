import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FlightInfo } from './flight-info.model';
import { FlightInfoPopupService } from './flight-info-popup.service';
import { FlightInfoService } from './flight-info.service';

@Component({
    selector: 'apsstr-flight-info-delete-dialog',
    templateUrl: './flight-info-delete-dialog.component.html'
})
export class FlightInfoDeleteDialogComponent {

    flightInfo: FlightInfo;

    constructor(
        private flightInfoService: FlightInfoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.flightInfoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'flightInfoListModification',
                content: 'Deleted an flightInfo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'apsstr-flight-info-delete-popup',
    template: ''
})
export class FlightInfoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private flightInfoPopupService: FlightInfoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.flightInfoPopupService
                .open(FlightInfoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
