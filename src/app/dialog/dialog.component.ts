import { ChangeDetectionStrategy, Component, Inject, inject, OnInit } from '@angular/core';
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

export interface DialogInputData{
  isConfirmed: boolean,
  title: string,
  content: string,
  confirmString: string,
  cancelString: string
}

@Component({
  selector: 'dialog',
  templateUrl: 'dialog.component.html',
  styleUrl: 'dialog.component.scss',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent implements OnInit {
  inputData: DialogInputData = {
    isConfirmed: false,
    title: '',
    content: '',
    confirmString: '',
    cancelString: ''
  }
  readonly dialogRef = inject(MatDialogRef<DialogComponent>);
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogInputData) { } //data: {isYesClicked: boolean, }

  ngOnInit(): void {
    this.inputData = this.data
  }

  onYes(){
    this.dialogRef.close(true);
  }

  onNo(){
    this.dialogRef.close(false);
  }
}
