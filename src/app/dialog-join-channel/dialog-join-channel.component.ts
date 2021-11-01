import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../services/auth/auth.service';
import { ChannelService } from '../services/channel/channel.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-dialog-join-channel',
  templateUrl: './dialog-join-channel.component.html',
  styleUrls: ['./dialog-join-channel.component.scss'],
})
export class DialogJoinChannelComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public channel: any,
    private userService: UserService,
    public authService: AuthService,
    private channelService: ChannelService
  ) {}

  ngOnInit(): void {}

  joinChannel(password: string) {
    if (password == this.channel.password) {
      
      if(this.filterJoinedUser(this.channel).length > 0) {
        //weiterleiten
          
      } else {
        this.channel.joinedUser.push(this.userService.user.uid)
        this.channelService.saveOtherChannelData(this.channel)
      }
      
    } else {
      this.authService.openErrorMessage('Password is not correct!');
    }
  }

  filterJoinedUser(channel: any) {
    return channel.joinedUser.filter(
      (userUID: string) => userUID == this.userService.user.uid
    );
  }
}
