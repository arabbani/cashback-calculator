import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ReturnType } from './return-type.model';
import { ReturnTypePopupService } from './return-type-popup.service';
import { ReturnTypeService } from './return-type.service';

@Component({
    selector: 'apsstr-return-type-delete-dialog',
    templateUrl: './return-type-delete-dialog.component.html'
})
export class ReturnTypeDeleteDialogComponent {

    returnType: ReturnType;

    constructor(
        private returnTypeService: ReturnTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.returnTypeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'returnTypeListModification',
                content: 'Deleted an returnType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'apsstr-return-type-delete-popup',
    template: ''
})
export class ReturnTypeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private returnTypePopupService: ReturnTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.returnTypePopupService
                .open(ReturnTypeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
