import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUserDeleteComponent } from './dialog-user-delete.component';

describe('DialogUserDeleteComponent', () => {
  let component: DialogUserDeleteComponent;
  let fixture: ComponentFixture<DialogUserDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogUserDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUserDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
