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
    source: '/assets/img/background/junior-pereira-73904-unsplash.jpg',
    waitLoadSource: true,
    blur: true,
    small: true
  };
  public static LoginRedirectPage = SideBarStyles.Login;
  public static LoginFailurePage = SideBarStyles.Login;
  public static LoginTokenPage = SideBarStyles.Login;
  public static LoginAccountPage = SideBarStyles.Login;
  public static LoginLoadingPage = SideBarStyles.Login;

  public static DashboardPage: SideBarConfig = {
    source: '/assets/img/background/junior-pereira-73904-unsplash.jpg',
    blur: true,
    small: true
  };

  public static NotFound: SideBarConfig = {
    source: '/assets/img/background/nate-bell-456723-unsplash.jpg',
    blur: true,
    small: true
  };
}
