import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BusInfo } from './bus-info.model';
import { BusInfoPopupService } from './bus-info-popup.service';
import { BusInfoService } from './bus-info.service';

@Component({
    selector: 'apsstr-bus-info-delete-dialog',
    templateUrl: './bus-info-delete-dialog.component.html'
})
export class BusInfoDeleteDialogComponent {

    busInfo: BusInfo;

    constructor(
        private busInfoService: BusInfoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.busInfoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'busInfoListModification',
                content: 'Deleted an busInfo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'apsstr-bus-info-delete-popup',
    template: ''
})
export class BusInfoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private busInfoPopupService: BusInfoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.busInfoPopupService
                .open(BusInfoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
