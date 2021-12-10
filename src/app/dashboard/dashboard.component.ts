import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogAddWishComponent } from '../dialog-add-wish/dialog-add-wish.component';
import { DialogDeleteChannelComponent } from '../dialog-delete-channel/dialog-delete-channel.component';
import { DialogEditWishComponent } from '../dialog-edit-wish/dialog-edit-wish.component';
import { DialogStartComponent } from '../dialog-start/dialog-start.component';
import { DialogUserDeleteComponent } from '../dialog-user-delete/dialog-user-delete.component';
import { AuthService } from '../services/auth/auth.service';
import { ChannelService } from '../services/channel/channel.service';
import { GiftService } from '../services/gift.service';
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
    public authService: AuthService,
    public giftService: GiftService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.channelService.loadCurrentChannel(params.id);
    });
  }

  /**
   * This function filter the User in channel.
   *
   * @returns {any}
   */
  filterUserInChannel() {
    let getUser = this.channelService.channel?.joinedUser?.filter(
      (joinedUser: { userID: any }) =>
        joinedUser.userID == this.userService.user.uid
    );
    return getUser[0];
  }

  /**
   * This function check the Toggle.
   *
   * @param {any} event
   */
  checkToggle(event: any) {
    console.log(this.filterUserInChannel().ready);
    this.filterUserInChannel().ready = event.checked;
    this.channelService.updateCurrentChannel();
  }

  /**
   * This function open the Gift.
   */
  openGift() {
    if (this.filterWishUser().draggedUser) {
      this.filterWishUser().open = true;
      this.userService.saveUserData();
    } else {
      this.authService.openErrorMessage('Has not yet been released');
    }
  }

  /**
   * This function open dialog create wish component.
   */
  openDialogCreateWish() {
    this.dialog.open(DialogAddWishComponent);
  }

  /**
   * This function filter the wish from user.
   *
   * @returns {any}
   */
  filterWishUser() {
    let getUser = this.userService.user.wishes.filter(
      (wishes: { channelID: any }) =>
        wishes.channelID == this.channelService.currentChannelID
    );
    return getUser[0];
  }

  /**
   * This function open the start dialog.
   */
  openDialogToStart() {
    this.dialog.open(DialogStartComponent);
  }

  /**
   * This function open the dialog delete user data.
   *
   * @param {any} user
   * @param {number} index
   */
  openDialogDeleteUserData(user: any, index: number) {
    if (this.channelService.channel.admin == this.userService.user.uid)
      this.dialog.open(DialogUserDeleteComponent, {
        data: {
          ID: user.userID,
          index: index,
        },
      });
  }


  /**
   * This function open the Dialog to edit a wish.
   * 
   * @param {number} index 
   * @param {string} wish 
   */
  openDialogEditWish(index: number, wish: string) {
    this.dialog.open(DialogEditWishComponent, {
      data: {
        index: index,
        currentWish: wish,
      },
    });
  }
}
