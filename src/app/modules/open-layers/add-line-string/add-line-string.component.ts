import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { LocationModel } from 'src/app/core/models/ILocation';
import { GeoLocationModel } from 'src/app/core/models/IGeoLocation';
import { GeoLocationService } from 'src/app/core/services/geo-location.service';
import { UnitModel } from 'src/app/core/models/IUnit';
import { wardModel } from 'src/app/core/models/IWard';
import { LocationService } from 'src/app/core/services/location.service';
import { UnitModulesService } from 'src/app/core/services/unit-modules.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-line-string',
  templateUrl: './add-line-string.component.html',
  styleUrls: ['./add-line-string.component.scss'],
})
export class AddLineStringComponent implements OnInit {
  locationId: string;
  coordinates: any = [];
  locationModel: LocationModel;

  geoLocationModel: GeoLocationModel;
  form: FormGroup;
  customStylesValidated = false;
  wardList: wardModel[];
  unitList: UnitModel[];
  inputDisable: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<AddLineStringComponent>,
    private locationService: LocationService,
    private unitService: UnitModulesService,
    private router: Router,
    private _fb: FormBuilder,
    private geolocationservice: GeoLocationService
  ) {
    this.locationService.dataEntrySearchParams.subscribe((result) => {
      this.locationId = result.locationId;
      this.coordinates = result.coordinates;
      this.getLocById(this.locationId);
    });
    this.locationService.getWards().subscribe(
      (result) => {
        if (result.status === 200) {
          this.wardList = result.data;
        }
      },
      (err) => {
        console.log(err);
      }
    );
    this.unitService.getUnits().subscribe(
      (result) => {
        if (result.status === 200) {
          this.unitList = result.data;
        }
      },
      (err) => {}
    );
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      workCode: ['', Validators.required],
      locationName: ['', Validators.required],
      description: [''],
      contractorName: ['', Validators.required],
      length: ['', Validators.required],
      lengthUnit: [''],
      width: [''],
      widthUnit: [''],
      dlpPeriod: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      wardName: ['', Validators.required],
      zoneName: ['', Validators.required],
      coordinates: [''],
      status: [''],
      roadType: [''],
      remarks: [''],
    });
  }

  getLocById(locationId: string) {
    this.locationService
      .getLocationById(this.locationId)
      .subscribe((result) => {
        if (result) {
          if (result.status === 200) {
            this.locationModel = result.data[0];
            if (this.locationModel) {
              this.inputDisable = true;
              this.form.patchValue({
                workCode: this.locationModel.workCode,
                locationName: result.data[0].locationName,
                description: result.data[0].description,
                contractorName: result.data[0].contractorName,
                length: result.data[0].length,
                lengthUnit: result.data[0].lengthUnit._id,
                width: result.data[0].width,
                widthUnit: result.data[0].widthUnit._id,
                startDate: moment(result.data[0].startDate).format(
                  'yyyy-MM-DD'
                ),
                endDate: moment(result.data[0].endDate).format('yyyy-MM-DD'),
                wardName: result.data[0].wardName._id,
                zoneName: result.data[0].wardName.Zone,
                coordinates: result.data[0].coordinates,
                status: result.data[0].status,
                roadType: result.data[0].roadType,
                remarks: result.data[0].remarks,
              });
             
            }
          }
        }
      });
   
  }

  onSubmit() {
    this.customStylesValidated = true;
    this.geoLocationModel = {
      location: this.locationModel,
      coordinates: this.coordinates,
      properties: null,
      createdBy: sessionStorage.getItem('FullName'),
      createdOn: new Date(),
      modifiedBy: null,
      modifiedOn: null,
    };

    this.geolocationservice
      .addGeoLocation(this.geoLocationModel)
      .subscribe((result) => {
        console.log(result);
        let route = 'location/list/';
        this.router.navigate([route]).then(() => {
          //window.location.reload();
        });

        Swal.fire({
          text: 'Changes have been saved!',
          icon: 'success',
        });
      });

    this.dialogRef.close();
  }

  onWardChange(event: Event) {
    const ward = this.wardList.filter(
      (m) => m._id === (event.target as HTMLInputElement).value
    );
    let zoneName = ward[0].Zone;
    console.log(zoneName);
    this.form.patchValue({
      zoneName: zoneName,
    });
  }

  Back() {
    let route = 'ol/digitize/' + String(this.locationId);
    this.router.navigate([route]).then(() => {
      window.location.reload();
    });
  }
  onReset() {
    this.customStylesValidated = false;
  }
}
