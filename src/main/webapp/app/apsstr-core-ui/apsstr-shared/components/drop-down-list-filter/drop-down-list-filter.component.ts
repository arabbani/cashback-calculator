import { Component, Input, OnChanges } from '@angular/core';
import { BaseFilterCellComponent, FilterService } from '@progress/kendo-angular-grid';
import { CompositeFilterDescriptor } from '@progress/kendo-data-query';

import { FilterEntitiesService } from '../../../apsstr-core/services';

@Component({
  selector: 'apsstr-drop-down-list-filter',
  templateUrl: './drop-down-list-filter.component.html',
  styles: []
})
export class DropDownListFilterComponent extends BaseFilterCellComponent implements OnChanges {

  public get selectedValue(): any {
    const filter = this.filterByField(this.valueField);
    return filter ? filter.value : null;
  }

  @Input() public filter: CompositeFilterDescriptor;
  @Input() private data: any[];
  @Input() public textField: string;
  @Input() public valueField: string;
  @Input() public filterable = true;
  public filteredData: any[];

  constructor(filterService: FilterService, private filterEntitiesService: FilterEntitiesService) {
    super(filterService);
  }

  public get defaultItem(): any {
    return {
      [this.textField]: 'Select item...',
      [this.valueField]: null
    };
  }

  ngOnChanges() {
    this.filteredData = this.data;
  }

  public onChange(value: any): void {
    this.applyFilter(
      value === null ? // value of the default item
        this.removeFilter(this.valueField) : // remove the filter
        this.updateFilter({ // add a filter for the field with the value
          field: this.valueField,
          operator: 'eq',
          value
        })
    ); // update the root filter
  }

  filterData(value) {
    this.filteredData = this.filterEntitiesService.byStringAttribute(this.data, this.textField, value);
  }

}
