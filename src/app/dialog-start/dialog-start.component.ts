import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ChannelService } from '../services/channel/channel.service';
import { GiftService } from '../services/gift.service';

@Component({
  selector: 'app-dialog-start',
  templateUrl: './dialog-start.component.html',
  styleUrls: ['./dialog-start.component.scss'],
})
export class DialogStartComponent implements OnInit {
  constructor(
    private channelService: ChannelService,
    public giftService: GiftService
  ) {}

  ngOnInit(): void {}

  startShareGifts() {
    this.giftService.getAllUserGift();
  }
}
