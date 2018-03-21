import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TravelType } from './travel-type.model';
import { TravelTypePopupService } from './travel-type-popup.service';
import { TravelTypeService } from './travel-type.service';

@Component({
    selector: 'apsstr-travel-type-delete-dialog',
    templateUrl: './travel-type-delete-dialog.component.html'
})
export class TravelTypeDeleteDialogComponent {

    travelType: TravelType;

    constructor(
        private travelTypeService: TravelTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.travelTypeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'travelTypeListModification',
                content: 'Deleted an travelType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'apsstr-travel-type-delete-popup',
    template: ''
})
export class TravelTypeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private travelTypePopupService: TravelTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.travelTypePopupService
                .open(TravelTypeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
