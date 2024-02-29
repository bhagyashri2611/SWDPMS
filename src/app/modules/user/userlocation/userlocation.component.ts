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
import { FormBuilder, FormGroup } from '@angular/forms';

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
    private userService: UserService,
    private _fb: FormBuilder
  ) {
    this.userService.getWards().subscribe(
      (result) => {
        if (result.status === 200) {
          this.modelWard = result.data;
        }
      },
      (err) => {
        // this.notificationService.warn(':: ' + err);
      }
    );
  }

  modelWard: any = {};
  ngOnInit(): void {
    this.form = this._fb.group({
      ward: [''],
    });

    this.route.paramMap.subscribe((param) => {
      let id = param.get('id');
      this.userID = id;
      if (id) {
        this.userService.getUserLocation(id).subscribe((result) => {
          if(result != null){
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
                this.allLocationLists = this.locationList;
              }
              this.userID = id;
            }
          }
          else {
            Swal.fire({
              title: 'Seesion Expired',
              text: 'Login Again to Continue',
              icon: 'warning',
              confirmButtonText: 'Ok',
            }).then((result) => {
              if (result.value) {
                debugger;
                this.logOut();
              }
            });
  
          }
            
          },
          (err) => {}
        );
      }
    });
    this.getLocations();
  }

  form: FormGroup;
  selectedWards: string[] = [];
  allLocationLists: any = [];

  onWardChange(e) {
    this.selectedWards = [];
    this.form.get('ward').value;
    this.selectedWards = this.form.value.ward;
  }

  allLocList: any = [];
  filterLocations() {
    debugger;
    this.locationList = this.allLocationLists;
    this.allLocList = this.locationList;
    let wdata = this.allLocList.filter((location) => {
      return this.selectedWards.includes(location.wardName.wardName);
    });

    this.locationList = wdata;
    [...this.locationList].sort();
    if (this.locationList.length == 0) {
      Swal.fire({
        text: 'No Locations Found!',
        icon: 'error',
      });
    }
  }

  reset() {
    this.getLocations();
    this.form.reset();
  }

  getLocations() {
    this.locationService.getLocations().subscribe((result) => {
      if(result != null){
        if (result.status === 200) {
          this.locationList = result.data;

          if (this.locationList) {
            this.locationList=this.locationList.sort((a, b) => (String(a.locationName)).localeCompare(String(b.locationName)));

            if (this.selectedLocationList) {
              this.locationList = this.locationList.filter(
                (n) => !this.selectedLocationList.some((n2) => n._id == n2._id)
              );
              this.allLocationLists = this.locationList;
            }
            debugger;
          }
        }
      }
      else {
        Swal.fire({
          title: 'Seesion Expired',
          text: 'Login Again to Continue',
          icon: 'warning',
          confirmButtonText: 'Ok',
        }).then((result) => {
          if (result.value) {
            debugger;
            this.logOut();
          }
          });
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

  logOut(){
    this.router.navigate(["/login/"]);
    sessionStorage.clear();
    window.location.reload();
  }

  getLItems() {
    debugger;
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
      wards: null,
      roleName: null,
      isActive: null,
      isDataEntry: null,
      locations: this.selectedLocationList,
      createdBy: 'Admin',
      createdOn: new Date(),
      modifiedBy: 'Admin',
      modifiedOn: new Date(),
    };
    this.userService.adduserlocation(this.userID, this.objUser).subscribe((result) => {
      if(result != null) {
        if (result.status === 201) {
          Swal.fire({
            text: ' Roads Attached',
            icon: 'success',
          });
          this.router.navigate(['user/list']);
        }
      }
      else {
        Swal.fire({
          title: 'Seesion Expired',
          text: 'Login Again to Continue',
          icon: 'warning',
          confirmButtonText: 'Ok',
        }).then((result) => {
          if (result.value) {
            debugger;
            this.logOut();
          }
          });
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
