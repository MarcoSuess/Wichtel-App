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
  

  /**
   * This function return the User data.
   * 
   * @param {any} userUID 
   * @returns {any}
   */
  returnUserData(userUID: any) {
    let getUser = this.userService.allUser.filter(
      (user: { uid: any }) => user.uid == userUID
    );

    return getUser[0];
  }


  /**
   * This function kick the user out from the channel.
   */
  deleteUser() {
    if (this.channelService.channel.admin !== this.user.ID) {
      this.channelService.channel.joinedUser.splice(this.user.index, 1);

      this.channelService.updateCurrentChannel();
      this.matDialog.closeAll();
    } else {
      this.authService.openErrorMessage(
        'You cant kick out Yourself , you are the Admin'
      );
    }
  }
}
