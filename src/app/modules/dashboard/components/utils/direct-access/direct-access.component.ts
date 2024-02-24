import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@setrass-hn/auth';
import { routeItems } from '../../../../../pages/routeItems';

@Component({
  selector: 'ecms-direct-access',
  templateUrl: './direct-access.component.html',
  styleUrls: ['./direct-access.component.scss']
})
export class DirectAccessComponent implements OnInit {
  currentUser:any;
  navItems = routeItems;

  constructor(
    public authService: AuthService,
    private router: Router,
  ) { }


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

  ngOnInit(): void {
    this.authService.checkAuth();
    this.currentUser = this.authService.user;
  }

}
