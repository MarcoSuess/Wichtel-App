import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChannelService } from '../services/channel/channel.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-dialog-edit-wish',
  templateUrl: './dialog-edit-wish.component.html',
  styleUrls: ['./dialog-edit-wish.component.scss'],
})
export class DialogEditWishComponent implements OnInit {
  loadImg: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public Userwish: any,
    private userService: UserService,
    private dialogRef: MatDialog,
    private channelService: ChannelService
  ) {}

  ngOnInit(): void {
    console.log();
  }


  /**
   * This function delete the wish.
   */
  deleteWish() {
    this.filterWishUser().wish.splice(this.Userwish.index, 1);
    this.userService.saveUserData();
    this.dialogRef.closeAll();
  }

  /**
   * This function save the wish.
   * 
   * @param {string} editWish 
   */
  saveWish(editWish: string) {
    this.filterWishUser().wish[this.Userwish.index] = editWish;
    this.userService.saveUserData();
    this.loadImg = true;

    setTimeout(() => {
      this.loadImg = false;
      this.dialogRef.closeAll();
    }, 2800);
  }


  /**
   * This function filter the  Wish from the user.
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
}
