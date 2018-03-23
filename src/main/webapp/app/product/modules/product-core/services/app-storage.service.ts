import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

import { AppStorage } from '../../..';
import { Category, CategoryService, SubCategory, SubCategoryService } from '../../../../entities';

@Injectable()
export class AppStorageService {

  private appStorage: AppStorage;
  private appStorageName = 'app-storage';

  constructor(private localStorageService: LocalStorageService, private subCategoryService: SubCategoryService, private categoryService: CategoryService) {
    this.initializeAppStorage();
  }

  initializeAppStorage(): void {
    this.appStorage = new AppStorage();
    this.initialize();
  }

  // getSubCategories(): SubCategory[] {
  //   if (this.appStorage && this.appStorage.subCategories) {
  //     return this.appStorage.subCategories;
  //   }
  // }

  private loadSubCategories(): void {
    this.subCategoryService.query().subscribe(
      (res: HttpResponse<SubCategory[]>) => {
        this.appStorage.subCategories = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private loadCategories(): void {
    this.categoryService.query().subscribe(
      (res: HttpResponse<Category[]>) => {
        this.appStorage.categories = res.body;
        this.store();
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  private store(): void {
    this.localStorageService.store(this.appStorageName, this.appStorage);
  }

  private initialize(): void {
    this.loadSubCategories();
    this.loadCategories();
  }

  private onError(error): void {
    console.log(error);
  }

}
