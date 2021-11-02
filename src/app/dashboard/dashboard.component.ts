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
  loadGift: boolean = false;

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

  filterOhterUserData() {
    let otherUser = this.filterUserWishes().draggedUser;
    let getOtherUserData = this.returnUserData(otherUser);

    return getOtherUserData;
  }

  filterOhterUserWishes(user: any) {
    let getUser = user.wishes.filter(
      (wishes: { channelID: any }) =>
        wishes.channelID == this.channelService.currentChannelID
    );
    return getUser[0];
  }

  filterUserWishes() {
    let getUser = this.userService.user.wishes.filter(
      (wishes: { channelID: any }) =>
        wishes.channelID == this.channelService.currentChannelID
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
    let randomUserIndex = this.getRandomUserIndex(arr);

    console.log(arr[randomUserIndex]);

    if (!this.checkFalseExistsArray(arr)) {
      /*   // getRandom USer */
      this.loadGift = true;
      if (arr[randomUserIndex].userID !== this.userService.user.uid) {
        this.filterUserWishes().draggedUser = arr[randomUserIndex].userID;
        arr.splice(randomUserIndex, 1);
        this.channelService.updateCurrentChannel();
        this.userService.saveUserData();
        this.loadGift = false;
      } else {
        this.authService.openErrorMessage('Try Again');
      }
    } else {
      this.authService.openErrorMessage('Not all users are ready');
    }
  }

  checkFalseExistsArray(array: any) {
    if (array)
      for (var k = 0; k < array.length; k++) {
        if (!array[k].ready) {
          return true;
          break;
        }
      }
    return false;
  }

  openDialogCreateWish() {
    this.dialog.open(DialogAddWishComponent);
  }

  filterWishUser() {
    let getUser = this.userService.user.wishes.filter(
      (wishes: { channelID: any }) =>
        wishes.channelID == this.channelService.currentChannelID
    );
    return getUser[0];
  }

  deleteWish(index: any) {
    this.filterWishUser().wish.splice(index, 1);
    this.userService.saveUserData();
  }

  getRandomUserIndex(arr: any) {
    return Math.floor(Math.random() * arr.length);
  }
}
