import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OperatingSystem } from './operating-system.model';
import { OperatingSystemPopupService } from './operating-system-popup.service';
import { OperatingSystemService } from './operating-system.service';

@Component({
    selector: 'apsstr-operating-system-delete-dialog',
    templateUrl: './operating-system-delete-dialog.component.html'
})
export class OperatingSystemDeleteDialogComponent {

    operatingSystem: OperatingSystem;

    constructor(
        private operatingSystemService: OperatingSystemService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.operatingSystemService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'operatingSystemListModification',
                content: 'Deleted an operatingSystem'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'apsstr-operating-system-delete-popup',
    template: ''
})
export class OperatingSystemDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private operatingSystemPopupService: OperatingSystemPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.operatingSystemPopupService
                .open(OperatingSystemDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
