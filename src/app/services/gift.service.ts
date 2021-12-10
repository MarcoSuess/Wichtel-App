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

  /**
   * This function iterate all users for the Gift.
   */
  getAllUserGift() {
    let allUsers = this.channelService.channel.joinedUser;
    let draggedUsers: any = [];

    if (allUsers.length > 2 && !this.checkFalseExistsArray(allUsers))
      do {
        let randomUserIndex = this.getRandomUserIndex(allUsers);
        this.loadGift = true;
        const user = allUsers[this.i];

        if (this.checkUser(allUsers, draggedUsers, randomUserIndex, user)) {
          this.pushUserGift(user, allUsers[randomUserIndex]);
          draggedUsers.push(allUsers[randomUserIndex].userID);
          this.i++;

          if (this.i == allUsers.length) {
            this.finishLoopActions(allUsers);
          }
        }
      } while (this.channelService.channel.open);
    else if (allUsers.length > 2 && this.checkFalseExistsArray(allUsers)) {
      this.authService.openErrorMessage('Not all users are ready');
    } else this.authService.openErrorMessage('You need at least 3 users');
  }

  /**
   * This function finish the loop.
   * @param {any} allUsers
   */
  finishLoopActions(allUsers: any) {
    this.channelService.channel.open = false;
    setTimeout(() => {
      this.loadGift = false;
    }, 2000);
    this.channelService.updateCurrentChannel();
    this.safeAllUserData(allUsers);
  }

  /**
   * This function check the user if he can pick the other user.
   *
   * @param {any} allUsers
   * @param {any}  draggedUsers
   * @param {any}  randomUserIndex
   * @param {any}  user
   * @returns {any}
   */
  checkUser(allUsers: any, draggedUsers: any, randomUserIndex: any, user: any) {
    return (
      allUsers[randomUserIndex].userID !== user.userID &&
      allUsers[randomUserIndex].userID !==
        this.filterOtherUserWishes(this.returnUserData(user.userID))
          .forbiddenUser &&
      allUsers[randomUserIndex].userID !==
        this.filterDraggedUsers(draggedUsers, allUsers[randomUserIndex].userID)
    );
  }

  /**
   * This function safe all joined user data.
   *
   * @param {any} joindedUser
   */
  safeAllUserData(joindedUser: any) {
    for (let i = 0; i < joindedUser.length; i++) {
      const user = joindedUser[i];

      this.userService.saveOtherUserData(this.returnUserData(user.userID));
    }
  }

  /**
   * This function push the gift to user.
   *
   * @param {any} user
   * @param {any} randomUser
   */
  pushUserGift(user: any, randomUser: any) {
    let otherUserWish = this.filterOtherUserWishes(
      this.returnUserData(randomUser.userID)
    );

    this.filterOtherUserWishes(this.returnUserData(user.userID)).draggedUser = randomUser.userID;

    otherUserWish.forbiddenUser = user.userID;
    console.log(this.filterOtherUserWishes(this.returnUserData(user.userID)));
  }



  /**
   * This function filter the user wishes.
   * 
   * @returns {any}
   */
  filterUserWishes() {
    let getUser = this.userService.user.wishes.filter(
      (wishes: { channelID: any }) =>
        wishes.channelID == this.channelService.currentChannelID
    );
    return getUser[0];
  }


  /**
   * This function filter the dragged user.
   * 
   * @param  {any} draggedUsers 
   * @param {any} randomUser 
   * @returns {any}
   */
  filterDraggedUsers(draggedUsers: any, randomUser: any) {
    let user = draggedUsers.filter(
      (draggedUsers: any) => draggedUsers == randomUser
    );
    return user[0];
  }


  /**
   * This function check false exist array.
   * 
   * @param {any} array 
   * @returns {boolean}
   */
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


  /**
   * This function filter the other user wishes.
   * 
   * @param {any} user 
   * @returns {any}
   */
  filterOtherUserWishes(user: any) {
    let getUser = user.wishes.filter(
      (wishes: { channelID: any }) =>
        wishes.channelID == this.channelService.currentChannelID
    );
    return getUser[0];
  }


  /**
   * This function get the random user index.
   * 
   * @param {any} arr 
   * @returns  {number} - This is the index.
   */
  getRandomUserIndex(arr: any) {
    return Math.floor(Math.random() * arr.length);
  }


  /**
   * This function return the user data.
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
   * This function filter the other user data.
   * 
   * @returns {any}
   */
  filterOhterUserData() {
    let otherUser = this.filterUserWishes().draggedUser;
    let getOtherUserData = this.returnUserData(otherUser);

    return getOtherUserData;
  }
}
