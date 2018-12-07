import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { SideBarService } from './side-bar.service';

@Component({
  selector: 'mr-side-bar',
  templateUrl: './side-bar.component.html'
})
export class SideBarComponent implements AfterViewInit {

  /**
   * Image Reference
   */
  @ViewChild('imageContainer')
  public imageContainer: ElementRef;

  /**
   * Side Bar
   * @param sideBarService
   */
  constructor(
    public sideBarService: SideBarService
  ) {
  }

  /**
   * After View Init
   */
  public ngAfterViewInit(): void {
    // fromEvent(this.imgReference1.nativeElement, 'load')
    //   .subscribe(() => this.sideBarService.setImageLoaded(this.imgReference1.nativeElement.getAttribute('src'), true));
    // fromEvent(this.imgReference2.nativeElement, 'load')
    //   .subscribe(() => this.sideBarService.setImageLoaded(this.imgReference2.nativeElement.getAttribute('src'), true));
  }
}
