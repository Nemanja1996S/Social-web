import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonsProfileComponent } from './persons-profile.component';

describe('PersonsProfileComponent', () => {
  let component: PersonsProfileComponent;
  let fixture: ComponentFixture<PersonsProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonsProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
