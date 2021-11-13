import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public auth: AngularFireAuth,
    public router: Router
  ) {}

  ngOnInit(): void {}

  signInGuest() {
     this.router.navigateByUrl('/channel/' +  'guest'); 
  }
}
