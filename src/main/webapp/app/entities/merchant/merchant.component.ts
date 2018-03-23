import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State } from '@progress/kendo-data-query';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import { ApsstrDialogService } from '../../apsstr-core-ui/apsstr-core/services';
import { GRID_STATE } from '../../shared';
import { SubCategory, SubCategoryService } from '../sub-category';
import { Merchant } from './merchant.model';
import { MerchantService } from './merchant.service';

@Component({
    selector: 'apsstr-merchant',
    templateUrl: './merchant.component.html'
})
export class MerchantComponent implements OnInit {

    public merchants: Merchant[];
    public gridState: State;
    merchantFormGroup: FormGroup;
    subCategories: SubCategory[];

    constructor(private merchantService: MerchantService, private formBuilder: FormBuilder,
        private apsstrKendoDialogService: ApsstrDialogService, private subCategoryService: SubCategoryService) {
        this.createMerchantFormGroup = this.createMerchantFormGroup.bind(this);
    }

    ngOnInit() {
        this.gridState = GRID_STATE;
        this.loadAllSubCategories();
        this.loadAllMerchant();
    }

    private loadAllSubCategories() {
        this.subCategoryService.query().subscribe(
            (res: HttpResponse<SubCategory[]>) => {
                this.subCategories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    private loadAllMerchant() {
        this.merchantService.query().subscribe(
            (res: HttpResponse<Merchant[]>) => {
                this.merchants = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    public createMerchantFormGroup(args: any): FormGroup {
        const item = args.isNew ? new Merchant() : args.dataItem;
        this.merchantFormGroup = this.formBuilder.group({
            'id': item.id,
            'name': [item.name, Validators.required],
            'active': item.active,
            'subCategories': [item.subCategories],
            'url': item.url
        });
        return this.merchantFormGroup;
    }

    public saveItem({ formGroup, isNew }): void {
        const product = formGroup.value;
        if (isNew) {
            this.subscribeToSaveResponse(this.merchantService.create(product), isNew);
        } else {
            this.subscribeToSaveResponse(this.merchantService.update(product));
        }
    }

    public deleteItem(dataItem: any): void {
        this.apsstrKendoDialogService.confirm().subscribe((result) => {
            if (result['text'] === 'No') {
                this.merchants.push(dataItem);
                this.merchants = _.sortBy(this.merchants, (item) => item.id);
            } else if (result['text'] === 'Yes') {
                this.merchantService.delete(dataItem.id).subscribe(
                    (response) => {
                        console.log('DELETED');
                    },
                    (error: HttpErrorResponse) => {
                        this.loadAllMerchant();
                        this.onError(error);
                    }
                );
            }
        });
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Merchant>>, isNew?: boolean) {
        result.subscribe((res: HttpResponse<Merchant>) =>
            this.onSaveSuccess(res.body, isNew), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Merchant, isNew?: boolean) {
        if (isNew && isNew === true) {
            this.loadAllMerchant();
        }
    }

    private onSaveError() {
        this.loadAllMerchant();
    }

    private onError(error) {
        console.log('ERROR');
    }

    public constructSubCategoryNames(subCategories: SubCategory[]): string {
        let subCategoriesName = '';
        if (subCategories) {
            const length = subCategories.length;
            _.forEach(subCategories, function(value, index) {
                subCategoriesName += value.name;
                if (index < length - 1) {
                    subCategoriesName += ', ';
                }
            });
        }
        return subCategoriesName;
    }
}
