import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ChannelService } from '../services/channel/channel.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-dialog-user-delete',
  templateUrl: './dialog-user-delete.component.html',
  styleUrls: ['./dialog-user-delete.component.scss'],
})
export class DialogUserDeleteComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public user: any,
    public userService: UserService,
    private matDialog: MatDialog,
    private channelService: ChannelService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  returnUserData(userUID: any) {
    let getUser = this.userService.allUser.filter(
      (user: { uid: any }) => user.uid == userUID
    );

    return getUser[0];
  }

  deleteUser() {

    if(this.channelService.channel.admin !== this.user.ID) {

   

    let index = this.channelService.channel.allUsers.indexOf(this.user.ID);

    this.channelService.channel.joinedUser.splice(index, 1);
    this.channelService.channel.allUsers.splice(index, 1);
    this.channelService.updateCurrentChannel();
    this.matDialog.closeAll();
  } else {
    this.authService.openErrorMessage('You cant kick out Yourself , you are the Admin');
  }
}
}