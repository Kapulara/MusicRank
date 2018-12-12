import { RouterModule, Routes } from '@angular/router';
import { AuthAppGuard } from '../../core/security/auth-app.guard';
import { CommunityDetailPageComponent } from './community-detail-page/community-detail-page.component';
import { CommunityPageComponent } from './community-page/community-page.component';

const communityRoutes: Routes = [
  {
    path: 'community',
    canActivate: [ AuthAppGuard ],
    children: [
      {
        path: '',
        component: CommunityPageComponent
      },
      {
        path: ':id',
        component: CommunityDetailPageComponent
      },
      {
        path: ':id/:tab',
        component: CommunityDetailPageComponent
      }
    ]
  }
];

export const COMMUNITY_ROUTES = RouterModule.forChild(communityRoutes);
