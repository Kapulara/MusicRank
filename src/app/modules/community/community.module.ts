import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../../shared/shared.module';
import { TopBarModule } from '../../shared/top-bar/top-bar.module';
import { CommunityBlockComponent } from './community-block/community-block.component';
import { CommunityDetailPageComponent } from './community-detail-page/community-detail-page.component';
import { CommunityDetailPageService } from './community-detail-page/community-detail-page.service';
import { CommunitySongProposalComponent } from './community-detail-page/community-song-proposal/community-song-proposal.component';
import { CommunityPageComponent } from './community-page/community-page.component';
import { CommunityPageService } from './community-page/community-page.service';
import { COMMUNITY_ROUTES } from './community.routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,

    TopBarModule,
    SharedModule,
    COMMUNITY_ROUTES
  ],
  declarations: [
    CommunityPageComponent,
    CommunityDetailPageComponent,
    CommunityBlockComponent,
    CommunitySongProposalComponent
  ],
  exports: [
    CommunityBlockComponent
  ],
  providers: [
    CommunityPageService,
    CommunityDetailPageService
  ]
})
export class CommunityModule {

}
