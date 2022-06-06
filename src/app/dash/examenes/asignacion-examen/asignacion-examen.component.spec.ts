import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionExamenComponent } from './asignacion-examen.component';

describe('AsignacionExamenComponent', () => {
  let component: AsignacionExamenComponent;
  let fixture: ComponentFixture<AsignacionExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignacionExamenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignacionExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
