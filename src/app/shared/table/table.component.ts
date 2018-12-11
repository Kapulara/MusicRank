import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface TableColumn {
  icon?: string;
  name?: string;
  type?: string;
  fill?: boolean;
  hover?: boolean;
  key: string;
}

@Component({
  selector: 'mr-table',
  templateUrl: './table.component.html'
})
export class TableComponent {
  @Input() public columns: TableColumn[] = [];
  @Input() public rows: any[] = [];
  @Input() public cap = null;
  @Output() public onRowClick: EventEmitter<any> = new EventEmitter();
  public showCap: boolean = false;

  public triggerClickEvent(
    row: any,
    column: TableColumn
  ) {
    this.onRowClick.next({
      row,
      column
    });
  }
}
