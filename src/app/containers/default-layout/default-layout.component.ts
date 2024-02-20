import { Component, OnInit } from '@angular/core';

import { navItems } from './_nav';
import {OtherThanAdmin} from './_nav'

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent implements OnInit {
  public navItems = navItems;
  userRole:String
  
  ngOnInit(): void {
    this.userRole=sessionStorage.getItem("UserRole")
    debugger;
    if(this.userRole!='Data Owner'){
      this.navItems = OtherThanAdmin;
    }
  }

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor() {}
}
