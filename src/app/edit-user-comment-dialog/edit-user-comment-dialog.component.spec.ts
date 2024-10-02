import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserCommentDialogComponent } from './edit-user-comment-dialog.component';

describe('EditUserCommentDialogComponent', () => {
  let component: EditUserCommentDialogComponent;
  let fixture: ComponentFixture<EditUserCommentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditUserCommentDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditUserCommentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
