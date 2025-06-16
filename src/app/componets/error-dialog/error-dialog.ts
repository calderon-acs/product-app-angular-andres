import { Component, Inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-error-dialog',
  imports: [MatDialogModule, MatButton, MatIcon],
  templateUrl: './error-dialog.html',
  styleUrl: './error-dialog.scss',
})
export class ErrorDialog {
  constructor(
    private dialogRef: MatDialogRef<ErrorDialog>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  close() {
    this.dialogRef.close();
  }
}
