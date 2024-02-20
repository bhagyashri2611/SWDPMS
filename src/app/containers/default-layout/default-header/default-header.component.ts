import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit{

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)
  public FullName=sessionStorage.getItem("FullName");
  public firstName=sessionStorage.getItem("firstName")
  constructor(private classToggler: ClassToggleService,private router:Router) {
    
    super();
  }

  id: any;
  ngOnInit() {
    
    this.id = sessionStorage.getItem('UserId');
  }

  profileclick() {
    this.router.navigate(['user/create/' + this.id]);
  }

  changePwd() {
    this.router.navigate(['user/changepassword/' + this.id]);
  }

  logOut(){
    this.router.navigate(["/login/"])
    sessionStorage.clear();
    window.location.reload();
  }
}
