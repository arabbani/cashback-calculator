import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Date } from './date.model';
import { DatePopupService } from './date-popup.service';
import { DateService } from './date.service';

@Component({
    selector: 'apsstr-date-delete-dialog',
    templateUrl: './date-delete-dialog.component.html'
})
export class DateDeleteDialogComponent {

    date: Date;

    constructor(
        private dateService: DateService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.dateService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'dateListModification',
                content: 'Deleted an date'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'apsstr-date-delete-popup',
    template: ''
})
export class DateDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private datePopupService: DatePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.datePopupService
                .open(DateDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
