import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AssetModel } from 'src/app/core/models/IAsset';
import {
  AssetInstanceListModel,
  AssetInstanceModel,
} from 'src/app/core/models/IAssetInstance';
import {
  DataEntryGroupModel,
  DataEntryModel,
} from 'src/app/core/models/IDataEntry';
import { LocationModel } from 'src/app/core/models/ILocation';
import { ModuleModel } from 'src/app/core/models/IModule';
import { ModulesInLocationModel } from 'src/app/core/models/IModules-In-Location';
import { AssetinstanceService } from 'src/app/core/services/assetinstance.service';
import { DataentryService } from 'src/app/core/services/dataentry.service';
import { LocationService } from 'src/app/core/services/location.service';
import { ModuleService } from 'src/app/core/services/module.service';
import { DataentryModule } from '../dataentry.module';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GeneratedataentrypageComponent } from '../generatedataentrypage/generatedataentrypage.component';
import * as moment from 'moment';
import { CommonService } from 'src/app/core/services/common.service';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/IUser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-createdataentry',
  templateUrl: './createdataentry.component.html',
  styleUrls: ['./createdataentry.component.scss'],
})
export class CreatedataentryComponent implements OnInit {
  pageTitle: string = 'Data Entry';
  form: FormGroup;
  model: any = {};
  // options: FormlyFormOptions = {};
  // fields: FormlyFieldConfig[] = [];
  idforEdit: string;
  locationList: LocationModel[];
  moduleInLocationList: ModulesInLocationModel[] = [];
  moduleList: ModuleModel[] = [];
  assetList: AssetModel[] = [];
  dataEntryList: DataEntryModel[];
  assetInstanceList: AssetInstanceListModel[] = [];
  dataEntryModel: DataEntryModel;
  dataentryGroup: DataEntryGroupModel;
  userData: User;
  customStylesValidated = false;

  constructor(
    private _fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private moduleService: ModuleService,
    private locationService: LocationService,
    private assetInstanceService: AssetinstanceService,
    private dataEntryService: DataentryService,
    private commonService: CommonService,
    private userService: UserService,
    public matDialog: MatDialog
  ) {
    let userRole = sessionStorage.getItem('UserRole');
    if (userRole === 'Data Owner') {
      this.locationService.getLocations().subscribe(
        (result) => {
          if (result != null) {
            if (result.status === 200) {
              this.locationList = result.data;
              this.locationList = this.locationList.sort((a, b) =>
                String(a.locationName).localeCompare(String(b.locationName))
              );
            }
          } else {
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
          console.log(err);
        }
      );
    } else {
      this.locationService.getLocationByUser().subscribe(
        (result) => {
          if (result != null) {
            if (result.status === 200) {
              this.locationList = result.data;
              this.locationList = this.locationList.sort((a, b) =>
                String(a.locationName).localeCompare(String(b.locationName))
              );
            }
          } else {
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
          console.log(err);
        }
      );
    }

    this.userService
      .getUserById(sessionStorage.getItem('UserId'))
      .subscribe((result) => {
        if (result != null) {
          this.userData = result.data[0];
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
      });
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      location: [
        '-1',
        [Validators.required, this.commonService.SelectRequiredValidator],
      ],
      // module: ['', Validators.required],
      // assetInstance: ['', Validators.required],
      dataDate: ['', Validators.required],
    });
  }

  logOut() {
    this.router.navigate(['/login/']);
    sessionStorage.clear();
    window.location.reload();
  }

  //get module list under location by lication id
  onLocationChange(locationid: string) {
    if (locationid != '-1') {
      this.dataEntryModel = {
        location: this.form.value.location,
        module: null,
        assetInstance: null,
        dataDate: this.form.value.dataDate,
        locationName: null,
        moduleName: null,
        assetnstanceName: null,
        ward: null,
        zone: null,
        workCode: null,
        contractorName: null,
        roadStatus: null,
        assignedSE: this.userData,
        createdBy: null,
        createdOn: null,
        modifiedBy: null,
        modifiedOn: null,
        attributeValues: null,
        modifiedByContractor: null,
      };
      this.dataEntryService.getDataEntrySearchParams(this.dataEntryModel);
      const dialogConfig = new MatDialogConfig();
      // The user can't close the dialog by clicking outside its body
      dialogConfig.disableClose = true;
      dialogConfig.id = 'modal-component';
      dialogConfig.height = '950px';
      dialogConfig.width = '1200px';
      const modalDialog = this.matDialog.open(
        GeneratedataentrypageComponent,
        dialogConfig
      );
    }
  }

  onModuleChange(moduleid: any) {
    let obj = {
      module: moduleid,
      assetInstance: '0',
    };
    this.assetInstanceService.getAssetInstanceByModuleId(obj).subscribe(
      (result) => {
        if (result.status === 200) {
          if (result.data) {
            this.assetInstanceList = result.data;
          }
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSubmit() {
    debugger;
    this.customStylesValidated = true;
    if (this.form.invalid) {
      return; // Exit the function if the form is invalid
    }
    debugger;
    this.dataEntryModel = {
      location: this.form.value.location,
      module: null,
      assetInstance: null,
      dataDate: this.form.value.dataDate,
      locationName: null,
      moduleName: null,
      assetnstanceName: null,
      ward: null,
      zone: null,
      workCode: null,
      contractorName: null,
      roadStatus: null,
      assignedSE: this.userData,
      createdBy: null,
      createdOn: null,
      modifiedBy: null,
      modifiedOn: null,
      attributeValues: null,
      modifiedByContractor: null,
    };
    debugger;
    this.dataEntryService.getDataEntrySearchParams(this.dataEntryModel);
    // const dialogConfig = new MatDialogConfig();
    // // The user can't close the dialog by clicking outside its body
    // dialogConfig.disableClose = true;
    // dialogConfig.id = 'modal-component';
    // dialogConfig.height = "950px";
    // dialogConfig.width = "900px";
    // dialogConfig.position = {
    //   top: '100px', // Example: 50px from the top of the viewport
    //   left: '300px' // Example: 50px from the left of the viewport
    // };
    // this.matDialog.open(
    //   GeneratedataentrypageComponent
    // );

    debugger;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; // Allow closing by clicking outside
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '950px';
    dialogConfig.width = '900px';
    // dialogConfig.position = {
    //   top: '100px',
    //   left: '300px'
    // };
    debugger;
    dialogConfig.panelClass = 'rounded-dialog'; // Apply custom CSS class for rounded corners
    this.matDialog.open(GeneratedataentrypageComponent, dialogConfig);
  }

  Back() {}
}
