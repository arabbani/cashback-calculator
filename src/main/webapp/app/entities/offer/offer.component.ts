import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { State } from '@progress/kendo-data-query';
import * as _ from 'lodash';

import { ApsstrKendoDialogService } from '../../apsstr-core-ui/apsstr-core/services';
import { GRID_STATE } from '../../shared';
import { Offer } from './offer.model';
import { OfferService } from './offer.service';

@Component({
    selector: 'apsstr-offer',
    templateUrl: './offer.component.html'
})
export class OfferComponent implements OnInit {

    public offers: Offer[];
    public gridState: State;

    constructor(private offerService: OfferService, private router: Router, private apsstrKendoDialogService: ApsstrKendoDialogService) { }

    ngOnInit() {
        this.gridState = GRID_STATE;
        this.loadAllOffer();
    }

    private loadAllOffer() {
        this.offerService.query().subscribe(
            (res: HttpResponse<Offer[]>) => {
                this.offers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    createOffer(): void {
        this.router.navigate(['offer']);
    }

    editOffer(offer: Offer): void {
        // this.router.navigate(
        //     ['/', { outlets: { popup: 'offer/' + offerId + '/edit' } }],
        //     { relativeTo: this.route }
        // );
        // this.router.navigate([`${offerId}/edit`], { relativeTo: this.route });
        this.router.navigate(['offer', { id: offer.id, edit: true }]);
    }

    viewOffer(offer: Offer): void {
        this.router.navigate(['offer', { id: offer.id }]);
    }

    removeOffer({ rowIndex, dataItem }): void {
        this.apsstrKendoDialogService.confirm().subscribe((result) => {
            if (result['text'] === 'Yes') {
                this.offerService.delete(dataItem.id).subscribe(
                    (response) => {
                        this.offers = _.difference(this.offers, [dataItem]);
                    },
                    (error: HttpErrorResponse) => {
                        this.loadAllOffer();
                        this.onError(error);
                    }
                );
            }
        });
    }

    private onError(error) {
        console.log('ERROR');
    }

}
