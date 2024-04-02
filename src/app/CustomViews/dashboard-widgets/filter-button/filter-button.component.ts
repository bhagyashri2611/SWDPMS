import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-filter-button',
  templateUrl: './filter-button.component.html',
  styleUrls: ['./filter-button.component.scss'],
})
export class FilterButtonComponent {
  constructor(public matDialog: MatDialog) {}

  filter() {
    debugger;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '600px';
    dialogConfig.width = '500px';
    dialogConfig.position = {
      top: '100px', // Example: 50px from the top of the viewport
      //left: '300px' // Example: 50px from the left of the viewport
    };
    dialogConfig.panelClass = 'rounded-dialog'; // Apply custom CSS class for rounded corners
    this.matDialog.open(FilterComponent, dialogConfig);

    debugger;
  }
}
