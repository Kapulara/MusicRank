import { RouterModule, Routes } from '@angular/router';
import { LoginFailurePageComponent } from './login-failure-page/login-failure-page.component';
import { LoginRedirectComponent } from './login-redirect/login-redirect.component';
import { LoginTokenComponent } from './login-token/login-token.component';

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
        component: LoginTokenComponent
      },
      {
        path: 'redirect',
        component: LoginRedirectComponent
      },
      {
        path: 'failure',
        component: LoginFailurePageComponent
      }
    ]
  }
];

export const LOGIN_ROUTES = RouterModule.forChild(loginRoutes);
