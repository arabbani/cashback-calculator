import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ReechargePlanType } from './reecharge-plan-type.model';
import { ReechargePlanTypePopupService } from './reecharge-plan-type-popup.service';
import { ReechargePlanTypeService } from './reecharge-plan-type.service';

@Component({
    selector: 'apsstr-reecharge-plan-type-delete-dialog',
    templateUrl: './reecharge-plan-type-delete-dialog.component.html'
})
export class ReechargePlanTypeDeleteDialogComponent {

    reechargePlanType: ReechargePlanType;

    constructor(
        private reechargePlanTypeService: ReechargePlanTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.reechargePlanTypeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'reechargePlanTypeListModification',
                content: 'Deleted an reechargePlanType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'apsstr-reecharge-plan-type-delete-popup',
    template: ''
})
export class ReechargePlanTypeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private reechargePlanTypePopupService: ReechargePlanTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.reechargePlanTypePopupService
                .open(ReechargePlanTypeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
