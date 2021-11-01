import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddWishComponent } from './dialog-add-wish.component';

describe('DialogAddWishComponent', () => {
  let component: DialogAddWishComponent;
  let fixture: ComponentFixture<DialogAddWishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddWishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddWishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
