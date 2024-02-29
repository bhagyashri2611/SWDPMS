import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationModel } from 'src/app/core/models/ILocation';
import { ModuleModel } from 'src/app/core/models/IModule';
import {
  ModulesInLocationModel,
  ModulesInLocationObjectModel,
  ModulesInLocationObjectModelList,
} from 'src/app/core/models/IModules-In-Location';
import { LocationService } from 'src/app/core/services/location.service';
import { ModuleService } from 'src/app/core/services/module.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modules-in-location',
  templateUrl: './modules-in-location.component.html',
  styleUrls: ['./modules-in-location.component.scss'],
})
export class ModulesInLocationComponent implements OnInit {
  locationList: LocationModel[];
  objLocation: LocationModel;
  moduleList: ModuleModel[] = [];
  notSelectedModuleList: ModuleModel[] = [];

  existingModuleList: ModuleModel[] = [];
  moduleInLocationList: ModulesInLocationModel[] = [];
  selectedModuleList: ModuleModel[] = [];
  finalModuleList: ModuleModel[] = [];
  objModulesInLocation: ModulesInLocationObjectModel;
  pageTitle: 'Create';
  locID: string;
  obj: ModulesInLocationObjectModelList;
  locationName: String;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private locationService: LocationService,
    private moduleService: ModuleService
  ) {}


  gridOptions = {
    rowHeight: 40,
    getRowHeight: function (params) {
      return 40;
    },
  };

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      let id = param.get('id');
      this.locID = id;
      if (id) {

        this.locationService.getLocationById(id).subscribe((result)=>{
          if(result != null){
            this.locationName =result.data[0].locationName
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
            
          }
        )
        this.locationService.getModulesInLocation(id).subscribe((result) => {
          if(result != null){
            if (result.status === 200) {
              this.moduleInLocationList = result.data;
              if (this.moduleInLocationList) {
                this.locationName =
                  this.moduleInLocationList[0]?.location.locationName;
                this.moduleInLocationList.forEach((element) => {
                  this.existingModuleList.push(element.module);
                  this.selectedModuleList.push(element.module);
                });
              }
              debugger;
              //this.selectedModuleList=result.data[0]
              this.locID = id;

              this.getModules();
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
    });
   
  }
  logOut(){
    this.router.navigate(["/login/"]);
    sessionStorage.clear();
    window.location.reload();
  }
  getModules() {
    this.moduleService.getModules().subscribe(
      (result) => {
        if (result.status === 200) {
          this.moduleList = result.data;
          if (this.moduleList) {
            if (this.selectedModuleList) {
              debugger;
              this.notSelectedModuleList = this.moduleList.filter(
                (n) => !this.selectedModuleList.some((n2) => n._id == n2._id)
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

  getLItems() {
    const mdls = [];
    this.selectedModuleList.forEach((element) => {
      mdls.push(element._id);
    });
    const data = {
      location: this.locID,
      module: mdls,
      createdOn: new Date(),
      createdBy: sessionStorage.getItem('FullName'),
      modifiedOn: new Date(),
      modifiedBy: sessionStorage.getItem('FullName'),  
      _id: '0',
      isActive: 1,
    };
    console.log(data);
    this.locationService.addModulesInLocation(this.locID, data).subscribe((result) => {
      if(result != null) {
        if (result.status === 201) {
          Swal.fire({
            text: String(result.message),
            icon: 'success',
          });
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
    this.router.navigate(['location/list']);
  }
  Back() {
    this.router.navigate(['location/list']);
  }
}
