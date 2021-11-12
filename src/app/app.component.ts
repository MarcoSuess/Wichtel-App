import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ChannelService } from './services/channel/channel.service';
import { UserService } from './services/user/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'wichtel-app';

  snowFlakeImg = [
    'assets/icons/50-Christmas-Icons-24.png',
    'assets/icons/50-Christmas-Icons-21.png',
  ];

  allSnowFlakes: any = [];
  constructor(
    public userService: UserService,
    public router: Router,
    private location: Location,
    public channelService: ChannelService
  ) {
    for (let i = 0; i < 3; i++) {
      let randomIndex = Math.floor(Math.random() * this.snowFlakeImg.length);
      this.allSnowFlakes.push(this.snowFlakeImg[randomIndex]);
    }
  }

  checkRoute() {
    return this.router.url.includes('dashboard');
  }

  goBack() {
    this.location.back();
  }

  setMyStyles(index: number) {
    let styles = {
      right: 40 * index + '%',
    };
    return styles;
  }
}
