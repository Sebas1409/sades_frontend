import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegExamenComponent } from './reg-examen.component';

describe('RegExamenComponent', () => {
  let component: RegExamenComponent;
  let fixture: ComponentFixture<RegExamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegExamenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegExamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
