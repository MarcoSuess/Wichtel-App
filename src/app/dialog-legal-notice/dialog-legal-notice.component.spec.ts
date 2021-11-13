import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLegalNoticeComponent } from './dialog-legal-notice.component';

describe('DialogLegalNoticeComponent', () => {
  let component: DialogLegalNoticeComponent;
  let fixture: ComponentFixture<DialogLegalNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogLegalNoticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLegalNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
