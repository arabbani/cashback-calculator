import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MainReturn } from './main-return.model';
import { MainReturnPopupService } from './main-return-popup.service';
import { MainReturnService } from './main-return.service';

@Component({
    selector: 'apsstr-main-return-delete-dialog',
    templateUrl: './main-return-delete-dialog.component.html'
})
export class MainReturnDeleteDialogComponent {

    mainReturn: MainReturn;

    constructor(
        private mainReturnService: MainReturnService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.mainReturnService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'mainReturnListModification',
                content: 'Deleted an mainReturn'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'apsstr-main-return-delete-popup',
    template: ''
})
export class MainReturnDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mainReturnPopupService: MainReturnPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.mainReturnPopupService
                .open(MainReturnDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
