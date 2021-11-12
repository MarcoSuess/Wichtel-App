import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChannelService } from '../services/channel/channel.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-dialog-add-wish',
  templateUrl: './dialog-add-wish.component.html',
  styleUrls: ['./dialog-add-wish.component.scss'],
})
export class DialogAddWishComponent implements OnInit {
  loadImg: boolean = false;

  constructor(
    private userService: UserService,
    private channelService: ChannelService,
    private dialogRef: MatDialog
  ) {}

  ngOnInit(): void {}

  saveWish(wish: any) {
    if (
      this.filterWishUser().channelID == this.channelService.currentChannelID
    ) {
      this.filterWishUser().wish.push(wish);
      this.userService.saveUserData();
      this.loadImg = true;

      setTimeout(() => {
        this.loadImg = false;
        this.dialogRef.closeAll();
      }, 2800);
    }

  
  }

  filterWishUser() {
    let getUser = this.userService.user.wishes.filter(
      (wishes: { channelID: any }) =>
        wishes.channelID == this.channelService.currentChannelID
    );
    return getUser[0];
  }
}
