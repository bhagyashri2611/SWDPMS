import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)
public uName=sessionStorage.getItem("UserName");
  constructor(private classToggler: ClassToggleService,private router:Router) {
    super();
  }

  logOut(){
    this.router.navigate(["/login/"])
    sessionStorage.clear();
    window.location.reload();
  }
}
