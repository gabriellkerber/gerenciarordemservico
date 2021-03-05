import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSenhaComponent } from './dialog-senha.component';

describe('DialogSenhaComponent', () => {
  let component: DialogSenhaComponent;
  let fixture: ComponentFixture<DialogSenhaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSenhaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
