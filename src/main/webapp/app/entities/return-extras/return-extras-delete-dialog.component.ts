import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ReturnExtras } from './return-extras.model';
import { ReturnExtrasPopupService } from './return-extras-popup.service';
import { ReturnExtrasService } from './return-extras.service';

@Component({
    selector: 'apsstr-return-extras-delete-dialog',
    templateUrl: './return-extras-delete-dialog.component.html'
})
export class ReturnExtrasDeleteDialogComponent {

    returnExtras: ReturnExtras;

    constructor(
        private returnExtrasService: ReturnExtrasService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.returnExtrasService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'returnExtrasListModification',
                content: 'Deleted an returnExtras'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'apsstr-return-extras-delete-popup',
    template: ''
})
export class ReturnExtrasDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private returnExtrasPopupService: ReturnExtrasPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.returnExtrasPopupService
                .open(ReturnExtrasDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
