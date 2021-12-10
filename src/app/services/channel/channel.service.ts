import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { UserService } from '../user/user.service';
import { Channel } from './channel';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  channel: Channel | any;
  currentChannelID: string | undefined;
  allChannels: any;
  loadChannel: boolean = false;

  constructor(
    public afs: AngularFirestore,
    private firestore: AngularFirestore,
    private userService: UserService
  ) {}



  /**
   * This function create a new Channel.
   * 
   * @param {string} channelName 
   * @param {string}  password 
   * @returns {any}
   */
  createNewChannel(channelName: string, password: string) {
    const newID = this.afs.createId();

    const channelRef: AngularFirestoreDocument<any> = this.afs.doc(
      `channels/${newID}`
    );
    const channelData = {
      name: channelName,
      password: password,
      ID: newID,
      joinedUser: [],
      admin: this.userService.user.uid,
      open: true,
    };
    return channelRef.set(channelData, {
      merge: true,
    });
  }


  /**
   * This function create a new Guest Channel.
   * @returns {any}
   */
  createGuestChannel() {
    const channelRef: AngularFirestoreDocument<any> = this.afs.doc(
      `channels/OnlyForGuest`
    );
    const channelData = {
      name: 'OnlyForGuest',
      password: 'OnlyForGuest3141',
      ID: 'OnlyForGuest',
      joinedUser: [
        { ready: false, userID: 'guest' },
        { ready: true, userID: 'javaScript' },
        { ready: true, userID: 'computer' },
      ],
      admin: 'guest',
      open: true,
    };
    return channelRef.set(channelData, {
      merge: true,
    });
  }


  /**
   * This function load the current channel.
   * @param {any} paramsID 
   */
  loadCurrentChannel(paramsID: any) {
    this.currentChannelID = paramsID;
    this.channel = new Channel();
    this.firestore
      .collection('channels')
      .doc(paramsID)
      .valueChanges()
      .subscribe((channel: any) => {
        this.channel.name = channel.name;
        this.channel.password = channel.password;
        this.channel.ID = channel.ID;
        this.channel.joinedUser = channel.joinedUser;
        this.channel.admin = channel.admin;
        this.channel.open = channel.open;
        this.loadChannel = true;
      });
  }


  /**
   * This function update the current channel.
   */
  updateCurrentChannel() {
    this.firestore
      .collection('channels')
      .doc(this.currentChannelID)
      .update(this.channel.toJson());
  }


  /**
   * This function save the other channel data.
   * @param {any} channel 
   */
  saveOtherChannelData(channel: any) {
    this.firestore
      .collection('channels')
      .doc(channel.ID)
      .update(this.OtherUserToJson(channel));
  }



  /**
   * This function returns other user data  into json.
   * 
   * @param {any} channel 
   * @returns {json}
   */
  OtherUserToJson(channel: any) {
    return {
      name: channel.name,
      password: channel.password,
      ID: channel.ID,
      joinedUser: channel.joinedUser,
      admin: channel.admin,
      open: channel.open,
    };
  }


  /**
   * This function load all channels.
   */
  loadAllChannels() {
    this.firestore
      .collection('channels')
      .valueChanges()
      .subscribe((channels) => {
        console.log('all Channels', channels);

        this.allChannels = channels;
      });
  }


  /**
   * This function delete a channel.
   * @param {number} channelIndex 
   */
  deleteChannel(channelIndex: number) {
    this.firestore
      .collection('channels')
      .get()
      .toPromise()
      .then((querySnapshot) => {
        querySnapshot.docs[channelIndex].ref.delete();
        this.allChannels.splice(channelIndex, 1);
      });
  }
}
