import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State } from '@progress/kendo-data-query';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import { ApsstrDialogService } from '../../apsstr-core-ui';
import { GRID_STATE } from '../../shared';
import { SubCategory, SubCategoryService } from '../sub-category';
import { ServiceProvider } from './service-provider.model';
import { ServiceProviderService } from './service-provider.service';

@Component({
    selector: 'apsstr-service-provider',
    templateUrl: './service-provider.component.html'
})
export class ServiceProviderComponent implements OnInit {

    public serviceProviders: ServiceProvider[];
    public gridState: State;
    serviceProviderFormGroup: FormGroup;
    subCategories: SubCategory[];

    constructor(private serviceProviderService: ServiceProviderService, private formBuilder: FormBuilder,
        private apsstrDialogService: ApsstrDialogService, private subCategoryService: SubCategoryService) {
        this.createServiceProviderFormGroup = this.createServiceProviderFormGroup.bind(this);
    }

    ngOnInit() {
        this.gridState = GRID_STATE;
        this.loadAllSubCategories();
        this.loadAllServiceProvider();
    }

    private loadAllSubCategories() {
        this.subCategoryService.findAll().subscribe(
            (res: HttpResponse<SubCategory[]>) => {
                this.subCategories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    private loadAllServiceProvider() {
        this.serviceProviderService.findWithSubCategories().subscribe(
            (res: HttpResponse<ServiceProvider[]>) => {
                this.serviceProviders = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    public createServiceProviderFormGroup(args: any): FormGroup {
        const item = args.isNew ? new ServiceProvider() : args.dataItem;
        this.serviceProviderFormGroup = this.formBuilder.group({
            'id': item.id,
            'name': [item.name, Validators.required],
            'subCategories': [item.subCategories]
        });
        return this.serviceProviderFormGroup;
    }

    public saveItem({ formGroup, isNew }): void {
        const product = formGroup.value;
        if (isNew) {
            this.subscribeToSaveResponse(this.serviceProviderService.create(product), isNew);
        } else {
            this.subscribeToSaveResponse(this.serviceProviderService.update(product));
        }
    }

    public deleteItem(dataItem: any): void {
        this.apsstrDialogService.confirm().subscribe((result) => {
            if (result['text'] === 'No') {
                this.serviceProviders.push(dataItem);
                this.serviceProviders = _.sortBy(this.serviceProviders, (item) => item.id);
            } else if (result['text'] === 'Yes') {
                this.serviceProviderService.delete(dataItem.id).subscribe(
                    (response) => {
                        console.log('DELETED');
                    },
                    (error: HttpErrorResponse) => {
                        this.loadAllServiceProvider();
                        this.onError(error);
                    }
                );
            }
        });
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ServiceProvider>>, isNew?: boolean) {
        result.subscribe((res: HttpResponse<ServiceProvider>) =>
            this.onSaveSuccess(res.body, isNew), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ServiceProvider, isNew?: boolean) {
        if (isNew && isNew === true) {
            this.loadAllServiceProvider();
        }
    }

    private onSaveError() {
        this.loadAllServiceProvider();
    }

    private onError(error) {
        console.log('ERROR');
    }

    public constructSubCategoryNames(subCategories: SubCategory[]): string {
        let subCategoriesName = '';
        if (subCategories) {
            const length = subCategories.length;
            _.forEach(subCategories, function(value, index) {
                subCategoriesName += value.code;
                if (index < length - 1) {
                    subCategoriesName += ', ';
                }
            });
        }
        return subCategoriesName;
    }
}
