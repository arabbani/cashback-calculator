import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State } from '@progress/kendo-data-query';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import { ApsstrDialogService } from '../../apsstr-core-ui/apsstr-core/services';
import { GRID_STATE } from '../../shared';
import { SubCategory, SubCategoryService } from '../sub-category';
import { Brand } from './brand.model';
import { BrandService } from './brand.service';

@Component({
    selector: 'apsstr-brand',
    templateUrl: './brand.component.html'
})
export class BrandComponent implements OnInit {

    public brands: Brand[];
    public gridState: State;
    brandFormGroup: FormGroup;

    subCategories: SubCategory[];
    defaultSubCategory = 'Select Sub Categories';

    constructor(private brandService: BrandService, private formBuilder: FormBuilder,
        private apsstrKendoDialogService: ApsstrDialogService, private subCategoryService: SubCategoryService) {
        this.createBrandFormGroup = this.createBrandFormGroup.bind(this);
    }

    ngOnInit() {
        this.gridState = GRID_STATE;
        this.loadAllSubCategories();
        this.loadAllBrand();
    }

    private loadAllSubCategories() {
        this.subCategoryService.query().subscribe(
            (res: HttpResponse<SubCategory[]>) => {
                this.subCategories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    private loadAllBrand() {
        this.brandService.query().subscribe(
            (res: HttpResponse<Brand[]>) => {
                this.brands = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    public createBrandFormGroup(args: any): FormGroup {
        const item = args.isNew ? new Brand() : args.dataItem;
        this.brandFormGroup = this.formBuilder.group({
            'id': item.id,
            'name': [item.name, Validators.required],
            'subCategories': [item.subCategories]
        });
        return this.brandFormGroup;
    }

    public saveItem({ formGroup, isNew }): void {
        const product = formGroup.value;
        if (isNew) {
            this.subscribeToSaveResponse(this.brandService.create(product), isNew);
        } else {
            this.subscribeToSaveResponse(this.brandService.update(product));
        }
    }

    public deleteItem(dataItem: any): void {
        this.apsstrKendoDialogService.confirm().subscribe((result) => {
            if (result['text'] === 'No') {
                this.brands.push(dataItem);
                this.brands = _.sortBy(this.brands, (item) => item.id);
            } else if (result['text'] === 'Yes') {
                this.brandService.delete(dataItem.id).subscribe(
                    (response) => {
                        console.log('DELETED');
                    },
                    (error: HttpErrorResponse) => {
                        this.loadAllBrand();
                        this.onError(error);
                    }
                );
            }
        });
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Brand>>, isNew?: boolean) {
        result.subscribe((res: HttpResponse<Brand>) =>
            this.onSaveSuccess(res.body, isNew), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Brand, isNew?: boolean) {
        if (isNew && isNew === true) {
            this.loadAllBrand();
        }
    }

    private onSaveError() {
        this.loadAllBrand();
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
