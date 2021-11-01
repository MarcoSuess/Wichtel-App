import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ChannelService } from '../services/channel/channel.service';

@Component({
  selector: 'app-dialog-add-channel',
  templateUrl: './dialog-add-channel.component.html',
  styleUrls: ['./dialog-add-channel.component.scss'],
})
export class DialogAddChannelComponent implements OnInit {
  constructor(
    public channelService: ChannelService,
    private dialogRef: MatDialogRef<DialogAddChannelComponent>
  ) {}

  ngOnInit(): void {}

  saveChannel(name: string, password: string) {
    this.channelService.createNewChannel(name, password);
    this.dialogRef.close();
  }
}
