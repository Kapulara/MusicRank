import { RouterModule, Routes } from '@angular/router';
import { AuthRedirectGuard } from '../../core/security/auth-redirect.guard';
import { HomePageComponent } from './home-page/home-page.component';

const homeRoutes: Routes = [
  {
    path: 'home',
    canActivate: [ AuthRedirectGuard ],
    children: [
      { path: '', component: HomePageComponent }
    ]
  }
];

export const HOME_ROUTES = RouterModule.forChild(homeRoutes);
