import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ChannelService } from '../services/channel/channel.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-dialog-add-wish',
  templateUrl: './dialog-add-wish.component.html',
  styleUrls: ['./dialog-add-wish.component.scss'],
})
export class DialogAddWishComponent implements OnInit {
  constructor(
    private userService: UserService,
    private channelService: ChannelService
  ) {}

  ngOnInit(): void {}

  saveWish(wish: any) {
    if (
      this.filterWishUser().channelID == this.channelService.currentChannelID
    ) {
      this.filterWishUser().wish.push(wish);
      this.userService.saveUserData();
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
