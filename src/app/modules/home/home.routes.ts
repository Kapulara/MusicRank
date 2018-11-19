import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';

const homeRoutes: Routes = [
  {
    path: 'home',
    children: [
      { path: '', component: HomePageComponent }
    ]
  }
];

export const HOME_ROUTES = RouterModule.forChild(homeRoutes);
