import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ChannelService } from './services/channel/channel.service';
import { UserService } from './services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogLegalNoticeComponent } from './dialog-legal-notice/dialog-legal-notice.component';
import { DialogDataProtectionComponent } from './dialog-data-protection/dialog-data-protection.component';
import { AuthService } from './services/auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    public userService: UserService,
    public router: Router,
    private location: Location,
    public channelService: ChannelService,
    public dialog: MatDialog,
    public authService: AuthService
  ) {}

  ngOnInit(): void {}


  /**
   * This function check the route if includes dashboard.
   * @returns {any} 
   */
  checkRoute() {
    return this.router.url.includes('dashboard');
  }


    /**
   * This function check the route if includes dashboard.
   * @returns {any} 
   */
  checkRouteChannel() {
    return this.router.url.includes('channel');
  }


  /**
   * This function goes one url back.
   */
  goBack() {
    this.location.back();
  }


  /**
   * This function open the Dialog legal notice.
   */
  openDialogLegalNotice() {
    this.dialog.open(DialogLegalNoticeComponent);
  }


  /**
   * This function open the Dialog data protection.
   */
  openDialogDataProtection() {
    this.dialog.open(DialogDataProtectionComponent);
  }
}
