import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarOsComponent } from './editar-os.component';

describe('EditarOsComponent', () => {
  let component: EditarOsComponent;
  let fixture: ComponentFixture<EditarOsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarOsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarOsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
