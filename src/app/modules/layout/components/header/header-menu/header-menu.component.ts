import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@setrass-hn/auth';
import { routeItems } from '../../../../../pages/routeItems';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
})
export class HeaderMenuComponent implements OnInit {
  public currentUser: any = {};
  public inDashboard: boolean = false;
  public isShowNavbar: boolean = false;
  navItems =  routeItems;

  constructor(
    private router: Router,
    public authService: AuthService,
    ) {}

  ngOnInit(): void {
    this.authService.checkAuth();
    this.isShowNavbar = localStorage.getItem('current_user') ? true : false;
    this.currentUser = this.authService.user;

    // if( Object.entries(this.currentUser).length === 0){
    //   this.router.navigate(["auth/personal/login"]);
    // }
  }

  calculateMenuItemCssClass(url: string): string {
    return checkIsActive(this.router.url, url) ? 'active' : '';
  }

  getWindowWidthClass() {
    return window.innerWidth >= 992 ? 'menu' : 'menu-column';
  }

  isMobile() {
    return window.innerWidth >= 992 ? false : true;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    // Update the class when the window is resized
    this.getWindowWidthClass();
  }

  isPatronos():boolean{
      return this.router.url.split('/').includes('patrono-empleador')
  }

  searchAuthorization(role: string | undefined): boolean {
    if(typeof role === "string" && Object.entries(this.currentUser).length != 0 && !this.isPatronos()){      
      const hasRole:boolean = this.currentUser.aud.includes(role);
      return hasRole;
    }
    else {
      return false;
    }
  }
}

const getCurrentUrl = (pathname: string): string => {
  return pathname.split(/[?#]/)[0];
};

const checkIsActive = (pathname: string, url: string) => {
  const current = getCurrentUrl(pathname);
  if (!current || !url) {
    return false;
  }

  if (current === url) {
    return true;
  }

  if (current.indexOf(url) > -1) {
    return true;
  }

  return false;
};
