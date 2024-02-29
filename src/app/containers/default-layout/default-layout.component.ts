import { Component, OnInit } from '@angular/core';

import { OtherThanAdminWithDataEntry, navItems } from './_nav';
import { OtherThanAdmin } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent implements OnInit {
  public navItems = navItems;
  userRole: String;
  isDataEntry: String;

  ngOnInit(): void {
    this.userRole = sessionStorage.getItem('UserRole');
    this.isDataEntry = sessionStorage.getItem('isDataEntry');

    debugger;
    if (this.userRole != 'Data Owner') {
      if (this.isDataEntry == 'Yes') {
        this.navItems = OtherThanAdminWithDataEntry;
      } else if(this.isDataEntry == 'No'){
        this.navItems = OtherThanAdmin;
      }
    }
  }

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor() {}
}
