import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDataProtectionComponent } from './dialog-data-protection.component';

describe('DialogDataProtectionComponent', () => {
  let component: DialogDataProtectionComponent;
  let fixture: ComponentFixture<DialogDataProtectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDataProtectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDataProtectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
