import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TravelInfo } from './travel-info.model';
import { TravelInfoPopupService } from './travel-info-popup.service';
import { TravelInfoService } from './travel-info.service';

@Component({
    selector: 'apsstr-travel-info-delete-dialog',
    templateUrl: './travel-info-delete-dialog.component.html'
})
export class TravelInfoDeleteDialogComponent {

    travelInfo: TravelInfo;

    constructor(
        private travelInfoService: TravelInfoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.travelInfoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'travelInfoListModification',
                content: 'Deleted an travelInfo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'apsstr-travel-info-delete-popup',
    template: ''
})
export class TravelInfoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private travelInfoPopupService: TravelInfoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.travelInfoPopupService
                .open(TravelInfoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
