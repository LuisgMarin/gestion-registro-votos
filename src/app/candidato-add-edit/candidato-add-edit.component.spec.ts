import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatoAddEditComponent } from './candidato-add-edit.component';

describe('CandidatoAddEditComponent', () => {
  let component: CandidatoAddEditComponent;
  let fixture: ComponentFixture<CandidatoAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatoAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatoAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
