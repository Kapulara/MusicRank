import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/security/api.service';
import { SecurityService } from '../../../core/security/security.service';

@Injectable()
export class CommunityPageService {

  public isLoading: boolean = false;
  public communities: any[] = [];
  public communitiesWithoutPlaylists: any[] = [];

  constructor(
    private securityService: SecurityService,
    private httpClient: HttpClient
  ) {
  }

  public async load() {
    this.isLoading = true;
    const { data: communities } = await this.httpClient.get(
      `${ApiService.host}/v1/community`,
      this.securityService.generateRequestOptions()
    ).toPromise() as any;

    for (const community of communities) {
      const { data: playlist } = await this.httpClient.post(
        `${ApiService.host}/v1/spotify/api/getPlaylist`,
        [community.playlistId],
        this.securityService.generateRequestOptions()
      ).toPromise() as any;
      community.playlist = playlist;
    }
    this.communities = communities;

    this.isLoading = false;
  }

  public async propose(id, songId) {
    const propose = await this.httpClient.post(
      `${ApiService.host}/v1/community/${id}/songs`,
      { songId },
      this.securityService.generateRequestOptions()
    ).toPromise() as any;

    await this.load();

    return propose;
  }

  private mapCommunities() {
    return [];
  }

  public async create(createName: string) {
    const { data } = await this.httpClient.post(
      `${ApiService.host}/v1/community`,
      { name: createName, threshold: 0 },
      this.securityService.generateRequestOptions()
    ).toPromise() as any;

    return data;
  }
}
