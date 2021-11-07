import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogStartComponent } from './dialog-start.component';

describe('DialogStartComponent', () => {
  let component: DialogStartComponent;
  let fixture: ComponentFixture<DialogStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogStartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
