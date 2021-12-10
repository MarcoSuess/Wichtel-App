import { Component, OnInit } from '@angular/core';
import { GiftService } from '../services/gift.service';

@Component({
  selector: 'app-dialog-start',
  templateUrl: './dialog-start.component.html',
  styleUrls: ['./dialog-start.component.scss'],
})
export class DialogStartComponent implements OnInit {
  constructor(
    
    public giftService: GiftService
  ) {}

  ngOnInit(): void {}
  
  /**
   * This function start the share gift function.
   */
  startShareGifts() {
    this.giftService.getAllUserGift();
  }
}
