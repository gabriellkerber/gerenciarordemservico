import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarClienteComponent } from './buscar-cliente.component';

describe('BuscarClienteComponent', () => {
  let component: BuscarClienteComponent;
  let fixture: ComponentFixture<BuscarClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
