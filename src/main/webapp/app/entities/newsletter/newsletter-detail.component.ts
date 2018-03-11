import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Newsletter } from './newsletter.model';
import { NewsletterService } from './newsletter.service';

@Component({
    selector: 'apsstr-newsletter-detail',
    templateUrl: './newsletter-detail.component.html'
})
export class NewsletterDetailComponent implements OnInit, OnDestroy {

    newsletter: Newsletter;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private newsletterService: NewsletterService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInNewsletters();
    }

    load(id) {
        this.newsletterService.find(id)
            .subscribe((newsletterResponse: HttpResponse<Newsletter>) => {
                this.newsletter = newsletterResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInNewsletters() {
        this.eventSubscriber = this.eventManager.subscribe(
            'newsletterListModification',
            (response) => this.load(this.newsletter.id)
        );
    }
}
