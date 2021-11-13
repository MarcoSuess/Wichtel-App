import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { ChannelService } from './channel/channel.service';
import { UserService } from './user/user.service';

@Injectable({
  providedIn: 'root',
})
export class GiftService {
  loadGift: boolean = false;
  i = 0;

  constructor(
    public userService: UserService,
    public channelService: ChannelService,
    public authService: AuthService
  ) {}

  getAllUserGift() {
    let arr = this.channelService.channel.joinedUser;

    if (arr.length > 2 && !this.checkFalseExistsArray(arr))
      do {
        let randomUserIndex = this.getRandomUserIndex(arr);
        this.loadGift = true;
        const user = arr[this.i];
        if (
          arr[randomUserIndex].userID !== user.userID &&
          arr[randomUserIndex].userID !==
            this.filterOtherUserWishes(this.returnUserData(user.userID))
              .forbiddenUser
        ) {
          this.pushUserGift(user, arr[randomUserIndex]);

          console.log(arr.length);
          this.i++;

          if (this.i == arr.length) {
            if (this.userService.user.uid !== 'guest') {
              this.safeAllUserData(arr);
              this.loadGift = false;
            }
          }
        }
      } while (this.loadGift);
    else if (arr.length > 2 && this.checkFalseExistsArray(arr)) {
      this.authService.openErrorMessage('Not all users are ready');
    } else this.authService.openErrorMessage('You need at least 3 users');
  }

  safeAllUserData(joindedUser: any) {
    for (let i = 0; i < joindedUser.length; i++) {
      const user = joindedUser[i];

      this.userService.saveOtherUserData(this.returnUserData(user.userID));
    }
  }

  pushUserGift(user: any, randomUser: any) {
    let otherUserWish = this.filterOtherUserWishes(
      this.returnUserData(randomUser.userID)
    );

    this.filterOtherUserWishes(this.returnUserData(user.userID)).draggedUser =
      randomUser.userID;

    otherUserWish.forbiddenUser = user.userID;
    console.log(this.filterOtherUserWishes(this.returnUserData(user.userID)));
    /*   this.saveRandomUser(user);
    this.saveRandomUser(randomUser); */
  }

  filterUserWishes() {
    let getUser = this.userService.user.wishes.filter(
      (wishes: { channelID: any }) =>
        wishes.channelID == this.channelService.currentChannelID
    );
    return getUser[0];
  }

  saveRandomUser(randomUser: any) {
    this.userService.saveOtherUserData(this.returnUserData(randomUser.userID));
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

  filterOtherUserWishes(user: any) {
    let getUser = user.wishes.filter(
      (wishes: { channelID: any }) =>
        wishes.channelID == this.channelService.currentChannelID
    );
    return getUser[0];
  }

  getRandomUserIndex(arr: any) {
    return Math.floor(Math.random() * arr.length);
  }

  returnUserData(userUID: any) {
    let getUser = this.userService.allUser.filter(
      (user: { uid: any }) => user.uid == userUID
    );

    return getUser[0];
  }

  filterOhterUserData() {
    let otherUser = this.filterUserWishes().draggedUser;
    let getOtherUserData = this.returnUserData(otherUser);

    return getOtherUserData;
  }
}
