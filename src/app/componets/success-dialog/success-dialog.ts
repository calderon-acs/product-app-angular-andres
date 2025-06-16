import { Component, Inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-success-dialog',
  imports: [MatDialogModule, MatButton, MatIcon],
  templateUrl: './success-dialog.html',
  styleUrl: './success-dialog.scss',
})
export class SuccessDialog {
  constructor(
    private dialogRef: MatDialogRef<SuccessDialog>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  close() {
    this.dialogRef.close();
  }
}
