import { Component, Inject, OnInit } from '@angular/core';

import { ChannelService } from '../services/channel/channel.service';
import { doc, deleteDoc } from 'firebase/firestore';
import { DialogJoinChannelComponent } from '../dialog-join-channel/dialog-join-channel.component';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
 

@Component({
  selector: 'app-dialog-delete-channel',
  templateUrl: './dialog-delete-channel.component.html',
  styleUrls: ['./dialog-delete-channel.component.scss'],
})
export class DialogDeleteChannelComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public channel: any,
    private channelService: ChannelService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {}

  async deleteChannel() {
    await this.channelService.deleteChannel(this.channel.index);
    this.matDialog.closeAll();
  }
}
