import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BankType } from './bank-type.model';
import { BankTypePopupService } from './bank-type-popup.service';
import { BankTypeService } from './bank-type.service';

@Component({
    selector: 'apsstr-bank-type-delete-dialog',
    templateUrl: './bank-type-delete-dialog.component.html'
})
export class BankTypeDeleteDialogComponent {

    bankType: BankType;

    constructor(
        private bankTypeService: BankTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.bankTypeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'bankTypeListModification',
                content: 'Deleted an bankType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'apsstr-bank-type-delete-popup',
    template: ''
})
export class BankTypeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bankTypePopupService: BankTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.bankTypePopupService
                .open(BankTypeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
