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

  filterUserInChannel() {
    let getUser = this.channelService.channel?.joinedUser?.filter(
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

  openGift() {
    if (this.filterWishUser().draggedUser) {
      this.filterWishUser().open = true;
      this.userService.saveUserData();
    } else {
      this.authService.openErrorMessage('Has not yet been released');
    }
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


  openDialogToStart() {
    this.dialog.open(DialogStartComponent);
  }

  openDialogUserData(user: any) {
    if (
      this.channelService.channel.admin == this.userService.user.uid &&
      this.channelService.channel.admin !== 'guest'
    )
      this.dialog.open(DialogUserDeleteComponent, {
        data: {
          ID: user.userID,
        },
      });
  }

  openDialogEditWish(index: number, wish: string) {
    this.dialog.open(DialogEditWishComponent, {
        data: {
          index: index,
          currentWish: wish
        }
    });
  }
}

