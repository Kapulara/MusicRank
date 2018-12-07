export interface SideBarConfig {
  source?: string;
  waitLoadSource?: boolean;
  small?: boolean;
  blur?: boolean;
}

export class SideBarStyles {
  public static Home: SideBarConfig = {
    source: '/assets/img/background/junior-pereira-73904-unsplash.jpg',
    waitLoadSource: true,
    small: false,
    blur: false
  };

  public static Login: SideBarConfig = {
    source: '/assets/img/background/john-salvino-417565-unsplash.jpg',
    waitLoadSource: true,
    blur: false,
    small: false
  };
  public static LoginRedirect = {
    ...SideBarStyles.Login,
    small: true
  };
  public static LoginFailure = SideBarStyles.Login;
  public static LoginToken = SideBarStyles.Login;

  public static NotFound: SideBarConfig = {
    source: '/assets/img/background/nate-bell-456723-unsplash.jpg',
    blur: true,
    small: true
  };
}
