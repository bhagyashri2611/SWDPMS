import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { LocationService } from 'src/app/core/services/location.service';
import { User } from 'src/app/core/models/IUser';
import { LocationModel } from 'src/app/core/models/ILocation';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-userlocation',
  templateUrl: './userlocation.component.html',
  styleUrls: ['./userlocation.component.scss'],
})
export class UserlocationComponent implements OnInit {
  userList: User[];
  objUser: User;
  locationList: LocationModel[] = [];
  existingLocationList: LocationModel[] = [];
  //userLocatioList:LocationModel[]=[];
  selectedLocationList: LocationModel[] = [];
  finalLocationList: LocationModel[] = [];
  //objModulesInLocation: ModulesInLocationObjectModel;
  pageTitle: 'Create';
  userID: string;
  userName: String;
  //obj: ModulesInLocationObjectModelList;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private locationService: LocationService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      let id = param.get('id');
      this.userID = id;
      if (id) {
        this.userService.getUserLocation(id).subscribe(
          (result) => {
            if (result.status === 200) {
              this.userList = result.data;
              if (this.userList) {
                this.userName =
                  this.userList[0].firstName + ' ' + this.userList[0].lastName;
                this.selectedLocationList = this.userList[0].locations;
                if (this.selectedLocationList) {
                  this.locationList = this.locationList.filter(
                    (n) =>
                      !this.selectedLocationList.some((n2) => n._id == n2._id)
                  );
                }
              }
              this.userID = id;
            }
          },
          (err) => {}
        );
      }
    });
    this.getLocations();
  }

  getLocations() {
    this.locationService.getLocations().subscribe(
      (result) => {
        if (result.status === 200) {
          this.locationList = result.data;
          if (this.locationList) {
            if (this.selectedLocationList) {
              this.locationList = this.locationList.filter(
                (n) => !this.selectedLocationList.some((n2) => n._id == n2._id)
              );
            }
          }
        }
      },
      (err) => {
        Swal.fire({
          text: err,
          icon: 'error',
        });
      }
    );
  }

  getLItems() {
    this.objUser = {
      _id: '0',
      userID: 0,
      firstName: null,
      lastName: null,
      userName: null,
      email: null,
      mobileNo: null,
      password: null,
      role: null,
      isActive: null,
      locations: this.selectedLocationList,
      createdBy: 'Admin',
      createdOn: new Date(),
      modifiedBy: 'Admin',
      modifiedOn: new Date(),
    };
    this.userService.adduserlocation(this.userID, this.objUser).subscribe(
      (result) => {
        if (result.status === 201) {
          Swal.fire({
            text: 'User Location Added',
            icon: 'success',
          });
          this.router.navigate(['user/list']);
        }
      },
      (err) => {
        Swal.fire({
          text: err,
          icon: 'error',
        });
      }
    );
  }

  Back() {
    this.router.navigate(['user/list']);
  }

  drop(event: CdkDragDrop<any, any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
