import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageExercisesComponent } from './language-exercises.component';

describe('LanguageExercisesComponent', () => {
  let component: LanguageExercisesComponent;
  let fixture: ComponentFixture<LanguageExercisesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageExercisesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageExercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
