import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { City } from './city.model';
import { CityPopupService } from './city-popup.service';
import { CityService } from './city.service';
import { State, StateService } from '../state';
import { Offer, OfferService } from '../offer';

@Component({
    selector: 'apsstr-city-dialog',
    templateUrl: './city-dialog.component.html'
})
export class CityDialogComponent implements OnInit {

    city: City;
    isSaving: boolean;

    states: State[];

    offers: Offer[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cityService: CityService,
        private stateService: StateService,
        private offerService: OfferService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.stateService.query()
            .subscribe((res: HttpResponse<State[]>) => { this.states = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.offerService.query()
            .subscribe((res: HttpResponse<Offer[]>) => { this.offers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.city.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cityService.update(this.city));
        } else {
            this.subscribeToSaveResponse(
                this.cityService.create(this.city));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<City>>) {
        result.subscribe((res: HttpResponse<City>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: City) {
        this.eventManager.broadcast({ name: 'cityListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackStateById(index: number, item: State) {
        return item.id;
    }

    trackOfferById(index: number, item: Offer) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'apsstr-city-popup',
    template: ''
})
export class CityPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cityPopupService: CityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cityPopupService
                    .open(CityDialogComponent as Component, params['id']);
            } else {
                this.cityPopupService
                    .open(CityDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
