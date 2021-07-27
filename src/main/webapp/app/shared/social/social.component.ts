import { Component, Input, OnInit } from '@angular/core';
import { SocialService } from './social.service';
import { CSRFService } from '../auth/csrf.service';

@Component({
    selector: 'apsstr-social',
    templateUrl: './social.component.html'
})
export class ApsstrSocialComponent implements OnInit {
    @Input() provider: string;
    label: string;
    providerSetting: string;
    providerURL: string;
    csrf: string;

    constructor(
        private csrfService: CSRFService,
        private socialService: SocialService
    ) {}

    ngOnInit() {
        switch (this.provider) {
            case 'google-plus': const arr = this.provider.split('-');
                                this.label = arr[0].charAt(0).toUpperCase() + arr[0].slice(1);
                break;
            default: this.label = this.provider.charAt(0).toUpperCase() + this.provider.slice(1);
        }
        this.providerSetting = this.socialService.getProviderSetting(this.provider);
        this.providerURL = this.socialService.getProviderURL(this.provider);
        this.csrf = this.csrfService.getCSRF();
    }
}
