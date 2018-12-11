import { RouterModule, Routes } from '@angular/router';
import { AuthAppGuard } from '../../core/security/auth-app.guard';
import { LoginAccountPageComponent } from './login-account-page/login-account-page.component';
import { LoginFailurePageComponent } from './login-failure-page/login-failure-page.component';
import { LoginLoadingPageComponent } from './login-loading-page/login-loading-page.component';
import { LoginRedirectPageComponent } from './login-redirect-page/login-redirect-page.component';
import { LoginTokenPageComponent } from './login-token-page/login-token-page.component';

const loginRoutes: Routes = [
  {
    path: 'login',
    children: [
      {
        path: '',
        redirectTo: '/login/redirect',
        pathMatch: 'full'
      },
      {
        path: 'token',
        component: LoginTokenPageComponent
      },
      {
        path: 'redirect',
        component: LoginRedirectPageComponent
      },
      {
        path: 'account',
        component: LoginAccountPageComponent,
        canActivate: [AuthAppGuard]
      },
      {
        path: 'loading',
        component: LoginLoadingPageComponent
      },
      {
        path: 'failure',
        component: LoginFailurePageComponent
      }
    ]
  }
];

export const LOGIN_ROUTES = RouterModule.forChild(loginRoutes);
