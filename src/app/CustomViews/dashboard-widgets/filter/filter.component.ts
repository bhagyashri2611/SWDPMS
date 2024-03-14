import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { MatDialogRef } from '@angular/material/dialog';

import {
  ILocationResponse,
  LocationModel,
} from 'src/app/core/models/ILocation';
import { CommonService } from 'src/app/core/services/common.service';
import { LocationService } from 'src/app/core/services/location.service';
import Swal from 'sweetalert2';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  locationForm: FormGroup;
  locationResponce: ILocationResponse;
  locationList: LocationModel[];
  objLocation: LocationModel;
  userRole = sessionStorage.getItem('UserRole');
  form: FormGroup;
  uniqueLocationNames: string[] = [];
  uniqueWardNames: string[] = [];
  uniqueZoneNames: string[] = [];
  uniqueContractorNames: string[] = [];
  uniqueRoadType: string[] = [];
  uniqueRoadStatus: string[] = [];
  uniqueWorkCode: string[] = [];
  constructor(
    public dialogRef: MatDialogRef<FilterComponent>,
    private _fb: FormBuilder,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private router: Router,
    private locationService: LocationService,
    public matDialog: MatDialog
  ) {}

  async ngOnInit(): Promise<void> {
    this.form = this._fb.group({
      roadName: [''],
      ward: [''],
      zone: [''],
      status: [''],
      contractor: [''],
    });

    await this.getLocation();
    this.extractUniqueValues(this.locationList);
  }

  async getLocation(): Promise<void> {
    const result = await (this.userRole === 'Data Owner'
      ? this.locationService.getLocations()
      : this.locationService.getLocationByUser()
    ).toPromise();

    if (result != null) {
      if (result.status === 200) {
        this.locationList = result.data;
        this.sortLocationList();
      } else {
        Swal.fire({
          text: String(result.message),
          icon: 'error',
        });
      }
    } else {
      Swal.fire({
        title: 'Session Expired',
        text: 'Login Again to Continue',
        icon: 'warning',
        confirmButtonText: 'Ok',
      }).then(() => this.logOut());
    }
  }

  sortLocationList(): void {
    this.locationList.sort((a, b) =>
      a.locationName.localeCompare(String(b.locationName))
    );
  }

  submit() {
    let objLocation = {
      roadName: this.form.value.roadName,
      ward: this.form.value.ward,
      zone: this.form.value.zone,
      contractor: this.form.value.contractor,
      status: this.form.value.status,
    };

    this.locationService.getDataEntrySearchParams(objLocation);

    //this.router.navigate(['/location/report/taskdetailsreport']);
    let route = 'location/report/taskdetailsreport';
    this.router.navigate([route]).then(() => {
      window.location.reload();
    });
    debugger;
    this.dialogRef.close();
  }

  filter() {
    let objLocation = {
      roadName: this.form.value.roadName,
      ward: this.form.value.ward,
      zone: this.form.value.zone,
      contractor: this.form.value.contractor,
      status: this.form.value.status,
    };
    debugger;

    let filteredList = this.locationList.filter(
      (item) =>
        (objLocation.zone === '' || objLocation.zone.includes(item.zoneName)) &&
        (objLocation.ward === '' ||
          objLocation.ward.includes(item.wardName.wardName)) &&
        (objLocation.contractor === '' ||
          objLocation.contractor.includes(item.contractorName)) &&
        (objLocation.status === '' ||
          objLocation.status.includes(item.status)) &&
        (objLocation.roadName === '' ||
          objLocation.roadName.includes(item.locationName))
    );

    this.extractUniqueValues(filteredList);
    debugger;
  }

  logOut() {
    this.router.navigate(['/login/']);
    sessionStorage.clear();
    window.location.reload();
  }

  handleError(error: any): void {
    Swal.fire({
      text: error,
      icon: 'error',
    });
  }

  reset() {
    this.form = this._fb.group({
      roadName: [''],
      ward: [''],
      zone: [''],
      status: [''],
      contractor: [''],
    });

    this.extractUniqueValues(this.locationList);
  }

  onFilterChange() {
    let objLocation = {
      roadName: this.form.value.roadName,
      ward: this.form.value.ward,
      zone: this.form.value.zone,
      contractor: this.form.value.contractor,
      status: this.form.value.status,
    };
    debugger;

    let filteredList = this.locationList.filter(
      (f) => f.zoneName === objLocation.zone[0]
    );
    this.extractUniqueValues(filteredList);
    debugger;
  }

  extractUniqueValues(locationList: LocationModel[]): void {
    debugger;
    this.uniqueLocationNames = [
      ...new Set(locationList.map((m) => String(m.locationName))),
    ];
    this.uniqueWardNames = [
      ...new Set(locationList.map((m) => String(m.wardName.wardName))),
    ];
    this.uniqueZoneNames = [
      ...new Set(locationList.map((m) => String(m.zoneName))),
    ];
    this.uniqueContractorNames = [
      ...new Set(locationList.map((m) => String(m.contractorName))),
    ];
    this.uniqueRoadStatus = [
      ...new Set(locationList.map((m) => String(m.status))),
    ];
    this.uniqueWorkCode = [
      ...new Set(locationList.map((m) => String(m.workCode))),
    ];
  }
}
