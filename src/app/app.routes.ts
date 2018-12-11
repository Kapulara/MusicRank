import { Routes } from '@angular/router';
import { NoContentComponent } from './shared/no-content/no-content.component';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  // { path: 'detail', loadChildren: '../+detail#DetailModule'},
  // { path: 'barrel', loadChildren: './+barrel#BarrelModule'},
  { path: '**',    component: NoContentComponent },
];
