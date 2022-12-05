import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Report } from '../interfaces';

@Component({
  selector: 'app-more-details-modal',
  templateUrl: './more-details-modal.component.html',
  styleUrls: ['./more-details-modal.component.css']
})
export class MoreDetailsModalComponent {
  constructor(
    public dialogRef: MatDialogRef<MoreDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Report
  ){}
}
