import { Injectable, NgZone } from '@angular/core';
import { FirebaseApp } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUserID: any;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  userName = new FormControl('', [Validators.required]);

  loadBar: boolean = false;

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public firebase: FirebaseApp,
    public afAuth: AngularFireAuth, // Inject Firestore auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private firestore: AngularFirestore,
    private _snackBar: MatSnackBar,
    private userService: UserService
  ) {}

  getErrorMessageName() {
    return 'You must enter a value';
  }

  getErrorMessageEmail() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorMessagePassword() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.password.hasError('minlength') ? 'min 6 length required' : '';
  }

  signUpUser(email: string, password: string, name: string) {
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.loadBar = true;

        setTimeout(() => {
          result.user?.sendEmailVerification();
          this.setUserData(result.user, name);
          this.navigateToSignIn();
          this.loadBar = false;
        }, 2000);
      })
      .catch((error) => {
        console.log(error);

        console.log('errorMessage', error.message);
        console.log('errorCode', error.code);
        this.openErrorMessage(error.message);
      });
  }

  signInUser(email: string, password: string) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.loadBar = true;
        setTimeout(() => {
          this.userOnline(result.user?.uid);
          this.currentUserID = result.user?.uid;
          this.navigateToBoard();
          this.loadBar = false;
        }, 2000);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        this.openErrorMessage(error.message);
      });
  }

  userOnline(uid: any) {
    var db = this.firebase.firestore();
    db.collection('users').doc(uid).update({ online: true });
  }

  openErrorMessage(message: any) {
    this._snackBar.open(message);
    setTimeout(() => {
      this.closeErrorMessage();
    }, 1500);
  }

  closeErrorMessage() {
    this._snackBar.ngOnDestroy();
  }

  navigateToBoard() {
    this.router.navigateByUrl('/channel/' + this.currentUserID);
  }

  navigateToSignIn() {
    this.router.navigateByUrl('/sign-in');
  }

  setUserData(user: any, name: string) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: name,
      emailVerified: user.emailVerified,
      online: false,
      wishes: [],
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  setUserGuest(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.name}`
    );
    const userData = {
      uid: user.name,
      email: '',
      displayName: user.name,
      emailVerified: '',
      online: false,
      wishes: [
        {
          channelID: 'OnlyForGuest',
          draggedUser: '',
          forbiddenUser: '',
          open: false,
          wish: user.wishes,
        },
      ],
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  signOut() {
    const auth = getAuth();
    signOut(auth)
      .then((result) => {
        console.log(result);
        this.router.navigateByUrl('/');
        
        this.userService.user.online = false;
        this.userService.saveUserData();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }
}
