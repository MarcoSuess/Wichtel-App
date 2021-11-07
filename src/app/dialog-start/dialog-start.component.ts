import { Component, OnInit } from '@angular/core';
import { ChannelService } from '../services/channel/channel.service';

@Component({
  selector: 'app-dialog-start',
  templateUrl: './dialog-start.component.html',
  styleUrls: ['./dialog-start.component.scss']
})
export class DialogStartComponent implements OnInit {

  constructor(private channelService: ChannelService) { }

  ngOnInit(): void {
  }

  startShareGifts() {
    this.channelService.channel.open = false;
    this.channelService.updateCurrentChannel();
  }


}
