import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { State } from '@progress/kendo-data-query';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';

import { ApsstrKendoDialogService } from '../../apsstr-core-ui/apsstr-core/services';
import { GRID_STATE } from '../../shared';
import { Category } from './category.model';
import { CategoryService } from './category.service';

@Component({
    selector: 'apsstr-category',
    templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit {

    public categories: Category[];
    public gridState: State;
    categoryFormGroup: FormGroup;

    constructor(private categoryService: CategoryService, private formBuilder: FormBuilder,
        private apsstrKendoDialogService: ApsstrKendoDialogService) {
        this.createCategoryFormGroup = this.createCategoryFormGroup.bind(this);
    }

    ngOnInit() {
        this.gridState = GRID_STATE;
        this.loadAllCategory();
    }

    private loadAllCategory() {
        this.categoryService.query().subscribe(
            (res: HttpResponse<Category[]>) => {
                this.categories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    public createCategoryFormGroup(args: any): FormGroup {
        const item = args.isNew ? new Category() : args.dataItem;
        this.categoryFormGroup = this.formBuilder.group({
            'id': item.id,
            'name': [item.name, Validators.required]
        });
        return this.categoryFormGroup;
    }

    public saveItem({ formGroup, isNew }): void {
        const product = formGroup.value;
        if (isNew) {
            this.subscribeToSaveResponse(this.categoryService.create(product), isNew);
        } else {
            this.subscribeToSaveResponse(this.categoryService.update(product));
        }
    }

    public deleteItem(dataItem: any): void {
        this.apsstrKendoDialogService.confirm().subscribe((result) => {
            if (result['text'] === 'No') {
                this.categories.push(dataItem);
                this.categories = _.sortBy(this.categories, (item) => item.id);
            } else if (result['text'] === 'Yes') {
                this.categoryService.delete(dataItem.id).subscribe(
                    (response) => {
                        console.log('DELETED');
                    },
                    (error: HttpErrorResponse) => {
                        this.loadAllCategory();
                        this.onError(error);
                    }
                );
            }
        });
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Category>>, isNew?: boolean) {
        result.subscribe((res: HttpResponse<Category>) =>
            this.onSaveSuccess(res.body, isNew), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Category, isNew?: boolean) {
        if (isNew && isNew === true) {
            this.loadAllCategory();
        }
    }

    private onSaveError() {
        this.loadAllCategory();
    }

    private onError(error) {
        console.log('ERROR');
    }
}
