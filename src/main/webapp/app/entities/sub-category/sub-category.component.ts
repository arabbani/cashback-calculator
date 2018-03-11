import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State } from '@progress/kendo-data-query';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import { ApsstrDialogService } from '../../apsstr-core-ui/apsstr-core/services';
import { GRID_STATE } from '../../shared';
import { Category, CategoryService } from '../category';
import { SubCategory } from './sub-category.model';
import { SubCategoryService } from './sub-category.service';

@Component({
    selector: 'apsstr-sub-category',
    templateUrl: './sub-category.component.html'
})
export class SubCategoryComponent implements OnInit {

    public subCategories: SubCategory[];
    public gridState: State;
    subCategoryFormGroup: FormGroup;

    categories: Category[];
    defaultCategory = {id: null, name: 'Select Category'};

    constructor(private subCategoryService: SubCategoryService, private formBuilder: FormBuilder,
        private apsstrKendoDialogService: ApsstrDialogService, private categoryService: CategoryService) {
        this.createSubCategoryFormGroup = this.createSubCategoryFormGroup.bind(this);
    }

    ngOnInit() {
        this.gridState = GRID_STATE;
        this.loadAllCategorys();
        this.loadAllSubCategory();
    }

    private loadAllCategorys() {
        this.categoryService.query().subscribe(
            (res: HttpResponse<Category[]>) => {
                this.categories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    private loadAllSubCategory() {
        this.subCategoryService.query().subscribe(
            (res: HttpResponse<SubCategory[]>) => {
                this.subCategories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    public createSubCategoryFormGroup(args: any): FormGroup {
        const item = args.isNew ? new SubCategory() : args.dataItem;
        this.subCategoryFormGroup = this.formBuilder.group({
            'id': item.id,
            'name': [item.name, Validators.required],
            'code': [item.code, Validators.required],
            'category': [item.category, Validators.required]
        });
        return this.subCategoryFormGroup;
    }

    public saveItem({ formGroup, isNew }): void {
        const product = formGroup.value;
        if (isNew) {
            this.subscribeToSaveResponse(this.subCategoryService.create(product), isNew);
        } else {
            this.subscribeToSaveResponse(this.subCategoryService.update(product));
        }
    }

    public deleteItem(dataItem: any): void {
        this.apsstrKendoDialogService.confirm().subscribe((result) => {
            if (result['text'] === 'No') {
                this.subCategories.push(dataItem);
                this.subCategories = _.sortBy(this.subCategories, (item) => item.id);
            } else if (result['text'] === 'Yes') {
                this.subCategoryService.delete(dataItem.id).subscribe(
                    (response) => {
                        console.log('DELETED');
                    },
                    (error: HttpErrorResponse) => {
                        this.loadAllSubCategory();
                        this.onError(error);
                    }
                );
            }
        });
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SubCategory>>, isNew?: boolean) {
        result.subscribe((res: HttpResponse<SubCategory>) =>
            this.onSaveSuccess(res.body, isNew), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SubCategory, isNew?: boolean) {
        if (isNew && isNew === true) {
            this.loadAllSubCategory();
        }
    }

    private onSaveError() {
        this.loadAllSubCategory();
    }

    private onError(error) {
        console.log('ERROR');
    }
}
