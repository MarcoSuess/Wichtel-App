import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditWishComponent } from './dialog-edit-wish.component';

describe('DialogEditWishComponent', () => {
  let component: DialogEditWishComponent;
  let fixture: ComponentFixture<DialogEditWishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditWishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditWishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
