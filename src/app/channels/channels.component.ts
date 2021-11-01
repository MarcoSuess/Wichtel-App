import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogAddChannelComponent } from '../dialog-add-channel/dialog-add-channel.component';
import { DialogJoinChannelComponent } from '../dialog-join-channel/dialog-join-channel.component';
import { AuthService } from '../services/auth/auth.service';
import { ChannelService } from '../services/channel/channel.service';
import { UserService } from '../services/user/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss'],
})
export class ChannelsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public userService: UserService,
    public channelService: ChannelService,
    public authService: AuthService,
    public router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userService.loadCurrentUserData(params.id);
      this.channelService.loadAllChannels();
      this.userService.loadAllUserData();
    });
  }

  openDialogCreateChannel() {
    this.dialog.open(DialogAddChannelComponent);
  }

  openDialogChannelLogin(channel: any) {
    this.dialog.open(DialogJoinChannelComponent, {
      data: {
        name: channel.name,
        password: channel.password,
        ID: channel.ID,
        joinedUser: channel.joinedUser,
        admin: channel.admin,
      },
    });
  }

  checkRoute() {
    return this.router.url.includes('dashboard');
  }

  goBack() {
    this.location.back();
  }
}
