import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'dialog',
  templateUrl: 'dialog.component.html',
  styleUrl: 'dialog.component.scss',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  readonly dialogRef = inject(MatDialogRef<DialogComponent>);
  constructor(@Inject(MAT_DIALOG_DATA) public data: {isYesClicked: boolean}) { }

  onYes(){
    this.dialogRef.close(true);
  }

  onNo(){
    this.dialogRef.close(false);
  }
}
