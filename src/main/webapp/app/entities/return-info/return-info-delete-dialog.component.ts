import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ReturnInfo } from './return-info.model';
import { ReturnInfoPopupService } from './return-info-popup.service';
import { ReturnInfoService } from './return-info.service';

@Component({
    selector: 'apsstr-return-info-delete-dialog',
    templateUrl: './return-info-delete-dialog.component.html'
})
export class ReturnInfoDeleteDialogComponent {

    returnInfo: ReturnInfo;

    constructor(
        private returnInfoService: ReturnInfoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.returnInfoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'returnInfoListModification',
                content: 'Deleted an returnInfo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'apsstr-return-info-delete-popup',
    template: ''
})
export class ReturnInfoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private returnInfoPopupService: ReturnInfoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.returnInfoPopupService
                .open(ReturnInfoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
