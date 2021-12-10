import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { ChannelService } from '../services/channel/channel.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  guestUsersData = [
    {
      name: 'guest',
      wishes: [],
    },
    {
      name: 'javaScript',
      wishes: ['Logic', 'New FrameWork'],
    },
    {
      name: 'computer',
      wishes: ['Hardware', 'a Good Programmer'],
    },
  ];

  constructor(
    public authService: AuthService,
    public auth: AngularFireAuth,
    public router: Router,
    private channelService: ChannelService
  ) {}

  ngOnInit(): void {}
  

  /**
   * This function sign in as guest user and create new Channel and navigate to channel.
   */
  signInGuest() {
    for (let user of this.guestUsersData) {
      this.authService.setUserGuest(user);
    }
    this.channelService.createGuestChannel();
    this.router.navigateByUrl('/channel/' + 'guest');
  }
}
