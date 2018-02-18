import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { JhiAlertService } from 'ng-jhipster';

import { Affiliate } from './affiliate.model';
import { AffiliateService } from './affiliate.service';

@Component({
    selector: 'apsstr-affiliate',
    templateUrl: './affiliate.component.html'
})
export class AffiliateComponent implements OnInit {
    affiliates: Affiliate[];
    public state: State = {
        skip: 0,
        take: 5
    };

    constructor(private affiliateService: AffiliateService, private jhiAlertService: JhiAlertService) {}

    ngOnInit() {
        this.loadAll();
    }

    private loadAll() {
        this.affiliateService.query().subscribe(
            (res: HttpResponse<Affiliate[]>) => {
                this.affiliates = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    public dataStateChange(state: DataStateChangeEvent): void {
        this.state = state;
        this.loadAll();
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

// affiliates: Affiliate[];
//     currentAccount: any;
//     eventSubscriber: Subscription;

//     constructor(
//         private affiliateService: AffiliateService,
//         private jhiAlertService: JhiAlertService,
//         private eventManager: JhiEventManager,
//         private principal: Principal
//     ) {
//     }

//     loadAll() {
//         this.affiliateService.query().subscribe(
//             (res: HttpResponse<Affiliate[]>) => {
//                 this.affiliates = res.body;
//             },
//             (res: HttpErrorResponse) => this.onError(res.message)
//         );
//     }
//     ngOnInit() {
//         this.loadAll();
//         this.principal.identity().then((account) => {
//             this.currentAccount = account;
//         });
//         this.registerChangeInAffiliates();
//     }

//     ngOnDestroy() {
//         this.eventManager.destroy(this.eventSubscriber);
//     }

//     trackId(index: number, item: Affiliate) {
//         return item.id;
//     }
//     registerChangeInAffiliates() {
//         this.eventSubscriber = this.eventManager.subscribe('affiliateListModification', (response) => this.loadAll());
//     }

//     private onError(error) {
//         this.jhiAlertService.error(error.message, null, null);
//     }
}
