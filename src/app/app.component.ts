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
  constructor(
    public userService: UserService,
    public router: Router,
    private location: Location,
    public channelService: ChannelService
  ) {}

  checkRoute() {
    return this.router.url.includes('dashboard');
  }

  goBack() {
    this.location.back();
  }
}
