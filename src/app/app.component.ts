import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ChannelService } from './services/channel/channel.service';
import { UserService } from './services/user/user.service';
import {MatDialog} from '@angular/material/dialog';
import { DialogLegalNoticeComponent } from './dialog-legal-notice/dialog-legal-notice.component';
import { DialogDataProtectionComponent } from './dialog-data-protection/dialog-data-protection.component';
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
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    
  }


  checkRoute() {
    return this.router.url.includes('dashboard');
  }

  goBack() {
    this.location.back();
  }

 

  openDialogLegalNotice() {
     this.dialog.open(DialogLegalNoticeComponent);
  }

  openDialogDataProtection() {
    this.dialog.open(DialogDataProtectionComponent);
  }
}
