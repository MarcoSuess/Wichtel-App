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


  /**
   * This function return a Error message.
   * 
   * @returns {string}
   */
  getErrorMessageName() {
    return 'You must enter a value';
  }

   /**
   * This function return a Error message.
   * 
   * @returns {string}
   */
  getErrorMessageEmail() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

   /**
   * This function return a Error message.
   * 
   * @returns {string}
   */
  getErrorMessagePassword() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.password.hasError('minlength') ? 'min 6 length required' : '';
  }


    /**
     * This function sign up the user.
     * 
     * @param {string} email 
     * @param {string} password 
     * @param {string} name 
     */
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
        console.log('errorMessage', error.message);
        this.openErrorMessage(error.message);
      });
  }
  


  /**
   * This function sign in the user.
   * 
   * @param {string} email 
   * @param {string} password 
   */
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


  /**
   * This function update the user to online.
   * @param {any} uid 
   */
  userOnline(uid: any) {
    var db = this.firebase.firestore();
    db.collection('users').doc(uid).update({ online: true });
  }


  /**
   * This function open the error message.
   * 
   * @param {any} message 
   */
  openErrorMessage(message: any) {
    this._snackBar.open(message);
    setTimeout(() => {
      this.closeErrorMessage();
    }, 1500);
  }


  /**
   * This function close the error Message.
   */
  closeErrorMessage() {
    this._snackBar.ngOnDestroy();
  }


  /**
   * This function navigate the url to Channel.
   */
  navigateToBoard() {
    this.router.navigateByUrl('/channel/' + this.currentUserID);
  }


  /**
   * This function navigate the url to Sign in.
   */
  navigateToSignIn() {
    this.router.navigateByUrl('/sign-in');
  }


  /**
   * This function set the user data.
   * 
   * @param {any} user 
   * @param {any} name 
   * @returns {any}
   */
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


  /**
   * This function set the data from Guest user.
   * 
   * @param {any} user 
   * @returns {any}
   */
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


  /**
   * This function navigate to index.html and save the user data.
   */
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
