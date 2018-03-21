import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ElectronicsInfo } from './electronics-info.model';
import { ElectronicsInfoPopupService } from './electronics-info-popup.service';
import { ElectronicsInfoService } from './electronics-info.service';

@Component({
    selector: 'apsstr-electronics-info-delete-dialog',
    templateUrl: './electronics-info-delete-dialog.component.html'
})
export class ElectronicsInfoDeleteDialogComponent {

    electronicsInfo: ElectronicsInfo;

    constructor(
        private electronicsInfoService: ElectronicsInfoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.electronicsInfoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'electronicsInfoListModification',
                content: 'Deleted an electronicsInfo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'apsstr-electronics-info-delete-popup',
    template: ''
})
export class ElectronicsInfoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private electronicsInfoPopupService: ElectronicsInfoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.electronicsInfoPopupService
                .open(ElectronicsInfoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
