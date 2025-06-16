import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loading-dialog',
  imports: [MatDialogModule, MatProgressSpinnerModule, CommonModule],
  templateUrl: './loading-dialog.html',
  styleUrl: './loading-dialog.scss'
})
export class LoadingDialog {

  constructor(public loadingService: LoadingService) {}
}
