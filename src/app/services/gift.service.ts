import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { ChannelService } from './channel/channel.service';
import { UserService } from './user/user.service';

@Injectable({
  providedIn: 'root',
})
export class GiftService {
  public loadGift: boolean = false;

  i = 0;

  constructor(
    public userService: UserService,
    public channelService: ChannelService,
    public authService: AuthService
  ) {}

  getAllUserGift() {
    let allUsers = this.channelService.channel.joinedUser;
    let draggedUsers: any = [];
    if (allUsers.length > 2 && !this.checkFalseExistsArray(allUsers))
      do {
        let randomUserIndex = this.getRandomUserIndex(allUsers);

        this.loadGift = true;
        const user = allUsers[this.i];

        if (
          allUsers[randomUserIndex].userID !== user.userID &&
          allUsers[randomUserIndex].userID !==
            this.filterOtherUserWishes(this.returnUserData(user.userID))
              .forbiddenUser &&
          allUsers[randomUserIndex].userID !==
            this.filterDraggedUsers(
              draggedUsers,
              allUsers[randomUserIndex].userID
            )
        ) {
          this.pushUserGift(user, allUsers[randomUserIndex]);
          draggedUsers.push(allUsers[randomUserIndex].userID);
          this.i++;

          if (this.i == allUsers.length) {
            console.log(this.i);
            this.channelService.channel.open = false;
            setTimeout(() => {
              this.loadGift = false;
            }, 2000);
         
            this.channelService.updateCurrentChannel();
            this.safeAllUserData(allUsers);
          }
        }
      } while (this.loadGift);
    else if (allUsers.length > 2 && this.checkFalseExistsArray(allUsers)) {
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
  }

  filterUserWishes() {
    let getUser = this.userService.user.wishes.filter(
      (wishes: { channelID: any }) =>
        wishes.channelID == this.channelService.currentChannelID
    );
    return getUser[0];
  }

  filterDraggedUsers(draggedUsers: any, randomUser: any) {
    let user = draggedUsers.filter(
      (draggedUsers: any) => draggedUsers == randomUser
    );
    return user[0];
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
