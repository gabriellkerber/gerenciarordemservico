import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogItemComponent } from './dialog-item-dim.component';

describe('DialogItemComponent', () => {
  let component: DialogItemComponent;
  let fixture: ComponentFixture<DialogItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
