import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogAddWishComponent } from '../dialog-add-wish/dialog-add-wish.component';
import { AuthService } from '../services/auth/auth.service';
import { ChannelService } from '../services/channel/channel.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public userService: UserService,
    public channelService: ChannelService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.channelService.loadCurrentChannel(params.id);
    });
  }

  returnUserData(userUID: any) {
    let getUser = this.userService.allUser.filter(
      (user: { uid: any }) => user.uid == userUID
    );

    return getUser[0];
  }

  filterUserInChannel() {
    let getUser = this.channelService.channel.joinedUser.filter(
      (joinedUser: { userID: any }) =>
        joinedUser.userID == this.userService.user.uid
    );
    return getUser[0];
  }

  checkToggle(event: any) {
    console.log(this.filterUserInChannel().ready);
    this.filterUserInChannel().ready = event.checked;
    this.channelService.updateCurrentChannel();
  }

  getUserGift() {
    let arr = this.channelService.channel.joinedUser;

    if (!this.checkFalseExistsArray(arr)) {
      // ziehen
    } else {
      this.authService.openErrorMessage('Not all users are ready');
    }
  }

  checkFalseExistsArray(array: any) {
    for (var k = 0; k < array.length; k++) {
      if (!array[k].ready) {
        return true;
        break;
      }
    }
    return false;
  }

  openDialogCreateWish() {
    this.dialog.open(DialogAddWishComponent)
  }

}
