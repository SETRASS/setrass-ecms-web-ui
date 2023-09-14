import { Component, OnInit } from '@angular/core';
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
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.user;
    this.userName = this.currentUser.name;
  }

}
