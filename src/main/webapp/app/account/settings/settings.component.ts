import { Component, OnInit } from '@angular/core';

import { AccountService, Principal } from '../../shared';

@Component({
    selector: 'apsstr-settings',
    templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
    error: string;
    success: string;
    settingsAccount: any;
    languages: any[];
    editMode: boolean;
    editedSettingsAccount: any;

    constructor(
        private account: AccountService,
        private principal: Principal
    ) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.settingsAccount = this.copyAccount(account);
        });
        this.editMode = false;
    }

    edit(): void {
        this.editMode = true;
        this.editedSettingsAccount = Object.assign({}, this.settingsAccount);
    }

    cancelEditing(): void {
        this.editMode = false;
        this.settingsAccount = Object.assign({}, this.editedSettingsAccount);
        this.editedSettingsAccount = undefined;
    }

    save() {
        this.account.save(this.settingsAccount).subscribe(() => {
            this.error = null;
            this.success = 'OK';
            this.principal.identity(true).then((account) => {
                this.settingsAccount = this.copyAccount(account);
            });
        }, () => {
            this.success = null;
            this.error = 'ERROR';
        });
    }

    copyAccount(account) {
        return {
            activated: account.activated,
            email: account.email,
            firstName: account.firstName,
            langKey: account.langKey,
            lastName: account.lastName,
            login: account.login,
            imageUrl: account.imageUrl
        };
    }
}
