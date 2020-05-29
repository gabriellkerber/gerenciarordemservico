import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarOSComponent } from './buscar-os.component';

describe('BuscarOSComponent', () => {
  let component: BuscarOSComponent;
  let fixture: ComponentFixture<BuscarOSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarOSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarOSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
