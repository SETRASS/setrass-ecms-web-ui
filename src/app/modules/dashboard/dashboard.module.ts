import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AnnouncementsComponent } from './components/utils/announcements/announcements.component';
import { NotificationsComponent } from './components/utils/notifications/notifications.component';
import { DirectAccessComponent } from './components/utils/direct-access/direct-access.component';



@NgModule({
  declarations: [
    DashboardComponent,
    AnnouncementsComponent,
    NotificationsComponent,
    DirectAccessComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
