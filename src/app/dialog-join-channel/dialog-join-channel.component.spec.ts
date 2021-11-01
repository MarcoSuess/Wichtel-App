import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogJoinChannelComponent } from './dialog-join-channel.component';

describe('DialogJoinChannelComponent', () => {
  let component: DialogJoinChannelComponent;
  let fixture: ComponentFixture<DialogJoinChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogJoinChannelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogJoinChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
