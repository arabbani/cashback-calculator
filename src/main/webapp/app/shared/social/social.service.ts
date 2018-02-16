import { Injectable } from '@angular/core';

@Injectable()
export class SocialService {

    constructor() {}

    getProviderSetting(provider) {
        switch (provider) {
            case 'google-plus': return 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';
            case 'facebook': return 'public_profile,email';
            case 'twitter': return '';
            // jhipster-needle-add-social-button
            default: return 'Provider setting not defined';
        }
    }

    getProviderURL(provider) {
        switch (provider) {
            case 'google-plus': return 'signin/google';
            default: return 'signin/' + provider;
        }
    }
}
