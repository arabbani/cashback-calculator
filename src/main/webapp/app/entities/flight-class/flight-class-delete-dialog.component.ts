import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FlightClass } from './flight-class.model';
import { FlightClassPopupService } from './flight-class-popup.service';
import { FlightClassService } from './flight-class.service';

@Component({
    selector: 'apsstr-flight-class-delete-dialog',
    templateUrl: './flight-class-delete-dialog.component.html'
})
export class FlightClassDeleteDialogComponent {

    flightClass: FlightClass;

    constructor(
        private flightClassService: FlightClassService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.flightClassService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'flightClassListModification',
                content: 'Deleted an flightClass'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'apsstr-flight-class-delete-popup',
    template: ''
})
export class FlightClassDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private flightClassPopupService: FlightClassPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.flightClassPopupService
                .open(FlightClassDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
