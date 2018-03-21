import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { State } from './state.model';
import { StateService } from './state.service';
import { Principal } from '../../shared';

@Component({
    selector: 'apsstr-state',
    templateUrl: './state.component.html'
})
export class StateComponent implements OnInit, OnDestroy {
states: State[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private stateService: StateService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.stateService.query().subscribe(
            (res: HttpResponse<State[]>) => {
                this.states = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInStates();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: State) {
        return item.id;
    }
    registerChangeInStates() {
        this.eventSubscriber = this.eventManager.subscribe('stateListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
