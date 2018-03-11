import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OperatingSystemType } from './operating-system-type.model';
import { OperatingSystemTypePopupService } from './operating-system-type-popup.service';
import { OperatingSystemTypeService } from './operating-system-type.service';

@Component({
    selector: 'apsstr-operating-system-type-delete-dialog',
    templateUrl: './operating-system-type-delete-dialog.component.html'
})
export class OperatingSystemTypeDeleteDialogComponent {

    operatingSystemType: OperatingSystemType;

    constructor(
        private operatingSystemTypeService: OperatingSystemTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.operatingSystemTypeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'operatingSystemTypeListModification',
                content: 'Deleted an operatingSystemType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'apsstr-operating-system-type-delete-popup',
    template: ''
})
export class OperatingSystemTypeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private operatingSystemTypePopupService: OperatingSystemTypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.operatingSystemTypePopupService
                .open(OperatingSystemTypeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
