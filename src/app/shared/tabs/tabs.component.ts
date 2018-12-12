import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import * as _ from 'lodash';

export interface TabItem {
  key: string;
  name: string;
  count?: number;
}

@Component({
  selector: 'mr-tabs',
  templateUrl: './tabs.component.html'
})
export class TabsComponent implements AfterViewInit {

  @Input() public activeTab: TabItem = null;
  @Input() public tabs: TabItem[] = [];
  @Output() public onTabChange: EventEmitter<TabItem> = new EventEmitter();

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  public ngAfterViewInit() {
    if ( this.tabs.length > 0 && _.isNil(this.activeTab) ) {
      this.activeTab = this.tabs[ 0 ];
      this.changeDetectorRef.detectChanges();
    }
  }

  public onTabClick(tab) {
    this.activeTab = tab;
    this.onTabChange.emit(this.activeTab);
  }

}
