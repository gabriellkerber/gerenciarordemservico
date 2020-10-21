import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogItemAdiComponent } from './dialog-item-adi.component';

describe('DialogItemAdiComponent', () => {
  let component: DialogItemAdiComponent;
  let fixture: ComponentFixture<DialogItemAdiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogItemAdiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogItemAdiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
