import { Component, Input } from '@angular/core';
import { BaseFilterCellComponent, FilterService } from '@progress/kendo-angular-grid';
import { CompositeFilterDescriptor } from '@progress/kendo-data-query';

@Component({
  selector: 'apsstr-drop-down-list-filter',
  templateUrl: './drop-down-list-filter.component.html',
  styles: []
})
export class DropDownListFilterComponent extends BaseFilterCellComponent {

  public get selectedValue(): any {
    const filter = this.filterByField(this.valueField);
    return filter ? filter.value : null;
  }

  @Input() public filter: CompositeFilterDescriptor;
  @Input() public data: any[];
  @Input() public textField: string;
  @Input() public valueField: string;

  constructor(filterService: FilterService) {
    super(filterService);
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

}
