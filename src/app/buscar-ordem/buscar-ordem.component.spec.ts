import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarOrdemComponent } from './buscar-ordem.component';

describe('BuscarOrdemComponent', () => {
  let component: BuscarOrdemComponent;
  let fixture: ComponentFixture<BuscarOrdemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarOrdemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarOrdemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
