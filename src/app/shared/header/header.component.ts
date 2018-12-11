import { Component, Input } from '@angular/core';

@Component({
  selector: 'mr-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Input() public extraMargin: boolean = false;
  @Input() public title: string;
  @Input() public subTitle: string;
}
