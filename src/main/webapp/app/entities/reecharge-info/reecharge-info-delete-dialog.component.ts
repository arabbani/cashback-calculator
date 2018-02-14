import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ReechargeInfo } from './reecharge-info.model';
import { ReechargeInfoPopupService } from './reecharge-info-popup.service';
import { ReechargeInfoService } from './reecharge-info.service';

@Component({
    selector: 'apsstr-reecharge-info-delete-dialog',
    templateUrl: './reecharge-info-delete-dialog.component.html'
})
export class ReechargeInfoDeleteDialogComponent {

    reechargeInfo: ReechargeInfo;

    constructor(
        private reechargeInfoService: ReechargeInfoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.reechargeInfoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'reechargeInfoListModification',
                content: 'Deleted an reechargeInfo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'apsstr-reecharge-info-delete-popup',
    template: ''
})
export class ReechargeInfoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private reechargeInfoPopupService: ReechargeInfoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.reechargeInfoPopupService
                .open(ReechargeInfoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
