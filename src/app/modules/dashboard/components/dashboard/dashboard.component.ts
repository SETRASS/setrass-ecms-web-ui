import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@setrass-hn/auth';
import { format } from 'date-fns';

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

  get getCurrentDateTime(){
    return format(new Date(), "dd/MM/yyyy - hh:mm aaaaa'm'");
  }

  getCurrentGreeting(): any {
    let time = new Date().getHours();
    if(time >= 0 && time <= 12) return "morning";
    if(time >= 13 && time <= 18) return "afternoon";
    if(time >= 18 && time <= 23) return "night";
  }

  get greetingText(){
    let current = this.getCurrentGreeting();
    let greetings: any = {
      morning: 'Buenos días ',
      afternoon: 'Buenas tardes ',
      night: 'Buenas noches ',
    }
    return greetings[current];
  }

}
