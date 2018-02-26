import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { State } from '@progress/kendo-data-query';

import { GRID_STATE } from '../../shared';
import { Newsletter } from './newsletter.model';
import { NewsletterService } from './newsletter.service';

@Component({
    selector: 'apsstr-newsletter',
    templateUrl: './newsletter.component.html'
})
export class NewsletterComponent implements OnInit {

    public newsletters: Newsletter[];
    public gridState: State;

    constructor(private newsletterService: NewsletterService) {}

    ngOnInit() {
        this.gridState = GRID_STATE;
        this.loadAllNewsletter();
    }

    private loadAllNewsletter() {
        this.newsletterService.query().subscribe(
            (res: HttpResponse<Newsletter[]>) => {
                this.newsletters = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    private onError(error) {
        console.log('ERROR');
    }
}
