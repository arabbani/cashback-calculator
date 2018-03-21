import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ReturnMode } from './return-mode.model';
import { ReturnModePopupService } from './return-mode-popup.service';
import { ReturnModeService } from './return-mode.service';

@Component({
    selector: 'apsstr-return-mode-delete-dialog',
    templateUrl: './return-mode-delete-dialog.component.html'
})
export class ReturnModeDeleteDialogComponent {

    returnMode: ReturnMode;

    constructor(
        private returnModeService: ReturnModeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.returnModeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'returnModeListModification',
                content: 'Deleted an returnMode'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'apsstr-return-mode-delete-popup',
    template: ''
})
export class ReturnModeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private returnModePopupService: ReturnModePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.returnModePopupService
                .open(ReturnModeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
