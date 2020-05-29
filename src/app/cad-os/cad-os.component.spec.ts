import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadOSComponent } from './cad-os.component';

describe('CadOSComponent', () => {
  let component: CadOSComponent;
  let fixture: ComponentFixture<CadOSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadOSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadOSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
