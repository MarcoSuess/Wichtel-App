import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
    private dialogRef: MatDialogRef<DialogJoinChannelComponent>
  ) {}

  ngOnInit(): void {}

  joinChannel(password: string) {
    if (password == this.channel.password) {
      if (
        this.filterJoinedUser(this.channel).userID == this.userService.user.uid
      ) {
        this.navigateToDashboard();
      } else {
        this.addUser();
      }
    } else {
      this.errorMessage();
    }
  }

  errorMessage() {
    this.authService.openErrorMessage('Password is not correct!');
  }

  addUser() {
    this.channel.joinedUser.push({
      userID: this.userService.user.uid,
      ready: false,
    });
    this.channelService.saveOtherChannelData(this.channel);
    this.navigateToDashboard();
  }

  filterJoinedUser(channel: any) {
    let getUser = channel.joinedUser.filter(
      (joinedUser: { userID: any }) =>
        joinedUser.userID == this.userService.user.uid
    );
    return getUser[0];
  }

  navigateToDashboard() {
    this.router.navigateByUrl(
      '/channel/' + this.userService.user.uid + '/dashboard/' + this.channel.ID
    );
    this.dialogRef.close();
  }
}
