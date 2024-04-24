import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FilterComponent } from '../filter/filter.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-filter-button',
  templateUrl: './filter-button.component.html',
  styleUrls: ['./filter-button.component.scss'],
})
export class FilterButtonComponent {
  constructor(
    public matDialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
    ) {}

  currentRoute = '';
  filter() {
    debugger;
    const cRoute = this.router.url;
    this.currentRoute = cRoute.split('?')[0];

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

  reset() {
    const cRoute = this.router.url;
    this.currentRoute = cRoute.split('?')[0];
    debugger;
    this.router.navigate([this.currentRoute]).then(() => {
      window.location.reload();
    });
  }
}
