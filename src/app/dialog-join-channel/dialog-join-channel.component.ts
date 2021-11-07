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

  joinChannel(password: string) {
    if (password == this.channel.password) {
      if (
        this.channel.allUsers.length > 0 &&
        this.filterJoinedUser(this.channel) == this.userService.user.uid
      ) {
        this.navigateToDashboard();
      } else if(this.channel.open) {
        this.addUser();
      }
    } else {
      this.errorMessage();
    }
  }

  errorMessage() {
    if(!this.channel.open) 
    this.authService.openErrorMessage('Channel is not open!');
    else 
    this.authService.openErrorMessage('Password is not correct!');
  }

  addUser() {
    this.channel.joinedUser.push({
      userID: this.userService.user.uid,
      ready: false,
    });
    this.channel.allUsers.push(this.userService.user.uid);
    this.userService.user.wishes.push({
      channelID: this.channel.ID,
      wish: [],
      draggedUser: '',
    });
    this.userService.saveUserData();
    this.channelService.saveOtherChannelData(this.channel);
    this.navigateToDashboard();
  }

  filterJoinedUser(channel: any) {
    let getUser = channel.allUsers.filter(
      (userID: string) => userID == this.userService.user.uid
    );

    return getUser[0];
  }

  navigateToDashboard() {
    this.router.navigateByUrl(
      '/channel/' + this.userService.user.uid + '/dashboard/' + this.channel.ID
    );
    this.dialogRef.close();
  }

  openWarnDialog() {
    this.dialog.open(DialogDeleteChannelComponent, {
      data: {
        index: this.channel.index,
        ID: this.channel.ID
      },
    });
  }
}
