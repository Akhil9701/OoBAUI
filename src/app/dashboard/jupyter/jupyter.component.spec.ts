import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JupyterComponent } from './jupyter.component';

describe('JupyterComponent', () => {
  let component: JupyterComponent;
  let fixture: ComponentFixture<JupyterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JupyterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JupyterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
