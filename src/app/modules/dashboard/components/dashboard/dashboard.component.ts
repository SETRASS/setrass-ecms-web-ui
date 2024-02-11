import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@setrass-hn/auth';

@Component({
  selector: 'ecms-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public currentUser: any = {};
  public userName:string = "Usuario";

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.user;
    this.userName = this.currentUser.name;
  }

}
