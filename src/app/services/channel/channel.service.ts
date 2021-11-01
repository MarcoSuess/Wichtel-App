import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import * as firebase from 'firebase/compat';
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
    };
    return channelRef.set(channelData, {
      merge: true,
    });
  }

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

        this.loadChannel = true;
      });
  }

  updateCurrentChannel() {
    this.firestore
      .collection('channels')
      .doc(this.currentChannelID)
      .update(this.channel.toJson());
  }

  saveOtherChannelData(channel: any) {
    this.firestore
      .collection('channels')
      .doc(channel.ID)
      .update(this.OtherUserToJson(channel));
  }

  OtherUserToJson(channel: any) {
    return {
      name: channel.name,
      password: channel.password,
      ID: channel.ID,
      joinedUser: channel.joinedUser,
      admin: channel.admin,
    };
  }

  loadAllChannels() {
    this.firestore
      .collection('channels')
      .valueChanges()
      .subscribe((channels) => {
        console.log('all Channels', channels);

        this.allChannels = channels;
      });
  }
}