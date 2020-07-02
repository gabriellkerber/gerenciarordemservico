import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogExclusaoComponent } from './dialog-exclusao.component';

describe('DialogExclusaoComponent', () => {
  let component: DialogExclusaoComponent;
  let fixture: ComponentFixture<DialogExclusaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogExclusaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogExclusaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
