import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Day } from './day.model';
import { DayPopupService } from './day-popup.service';
import { DayService } from './day.service';

@Component({
    selector: 'apsstr-day-delete-dialog',
    templateUrl: './day-delete-dialog.component.html'
})
export class DayDeleteDialogComponent {

    day: Day;

    constructor(
        private dayService: DayService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.dayService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'dayListModification',
                content: 'Deleted an day'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'apsstr-day-delete-popup',
    template: ''
})
export class DayDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dayPopupService: DayPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.dayPopupService
                .open(DayDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
