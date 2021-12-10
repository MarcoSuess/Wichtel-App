import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogDeleteChannelComponent } from '../dialog-delete-channel/dialog-delete-channel.component';
import { AuthService } from '../services/auth/auth.service';
import { ChannelService } from '../services/channel/channel.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-dialog-join-channel',
  templateUrl: './dialog-join-channel.component.html',
  styleUrls: ['./dialog-join-channel.component.scss'],
})
export class DialogJoinChannelComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public channel: any,
    public userService: UserService,
    public authService: AuthService,
    private channelService: ChannelService,
    public router: Router,
    private dialogRef: MatDialogRef<DialogJoinChannelComponent>,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    console.log(this.channel);
  }


  /**
   * This function is for Join a channel.
   * 
   * @param {string} password 
   */
  joinChannel(password: string) {
    console.log(this.filterJoinedUser(this.channel.joinedUser));

    if (password == this.channel.password) {
      if (
        this.filterJoinedUser(this.channel.joinedUser)?.userID ==
        this.userService.user.uid
      ) {
        this.navigateToDashboard();
      } else if (this.channel.open) {
        this.addUser();
      } else {
        this.authService.openErrorMessage('Channel is not open!');
      }
    } else {
      this.authService.openErrorMessage('Password is not correct!');
    }
  }


  /**
   * This function add the user to the Channel.
   */
  addUser() {
    this.channel.joinedUser.push({
      userID: this.userService.user.uid,
      ready: false,
    });

    this.userService.user.wishes.push({
      channelID: this.channel.ID,
      wish: [],
      draggedUser: '',
      forbiddenUser: '',
      open: false,
    });
    this.userService.saveUserData();
    this.channelService.saveOtherChannelData(this.channel);
    this.navigateToDashboard();
  } 

  /**
   * This function filter the Joined user from the channel.
   * 
   * @param {any} joinedUser 
   * @returns {any}
   */
  filterJoinedUser(joinedUser: any) {
    let getUser = joinedUser.filter(
      (joinedUser: { userID: any }) =>
        joinedUser.userID == this.userService.user.uid
    );

    return getUser[0];
  }


  /**
   * This function navigate the url to dashboard
   */
  navigateToDashboard() {
    this.router.navigateByUrl(
      '/channel/' + this.userService.user.uid + '/dashboard/' + this.channel.ID
    );
    this.dialogRef.close();
  }


  /**
   * This function open the warn dialog.
   */
  openWarnDialog() {
    this.dialog.open(DialogDeleteChannelComponent, {
      data: {
        index: this.channel.index,
        ID: this.channel.ID,
      },
    });
  }
}
