import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicaoImagemProdutoComponent } from './edicao-imagem-produto.component';

describe('EdicaoImagemProdutoComponent', () => {
  let component: EdicaoImagemProdutoComponent;
  let fixture: ComponentFixture<EdicaoImagemProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdicaoImagemProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdicaoImagemProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
