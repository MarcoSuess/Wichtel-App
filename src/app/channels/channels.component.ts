import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogAddChannelComponent } from '../dialog-add-channel/dialog-add-channel.component';
import { DialogJoinChannelComponent } from '../dialog-join-channel/dialog-join-channel.component';
import { AuthService } from '../services/auth/auth.service';
import { ChannelService } from '../services/channel/channel.service';
import { UserService } from '../services/user/user.service';

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
    public router: Router
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

  openDialogChannelLogin(channel: any, index: number) {
    if (
      channel.name == 'OnlyForGuest' &&
      this.userService.user.uid == 'guest'
    ) {
      this.router.navigateByUrl(
        '/channel/' + this.userService.user.uid + '/dashboard/' + channel.ID
      );
    } else if (channel.ID !== 'OnlyForGuest' &&  this.userService.user.uid !== 'guest') {
      this.openDialogJoin(channel, index);
    } else {
      this.authService.openErrorMessage(
        'You cannot join because is only for guest user'
      );
    }
  }

  openDialogJoin(channel: any, index: number) {
    this.dialog.open(DialogJoinChannelComponent, {
      data: {
        ID: channel.ID,
        admin: channel.admin,
        allUsers: channel.allUsers,
        joinedUser: channel.joinedUser,
        name: channel.name,
        password: channel.password,
        index: index,
        open: channel.open,
      },
    });
  }

  checkRoute() {
    return this.router.url.includes('dashboard');
  }
}
