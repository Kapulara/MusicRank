import { Component, Input } from '@angular/core';

@Component({
  selector: 'mr-center',
  templateUrl: './center.component.html'
})
export class CenterComponent {

  @Input() public autoHeight: boolean = false;

}
