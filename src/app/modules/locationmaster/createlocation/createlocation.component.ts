import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import * as moment from 'moment';
import {
  ILocationResponse,
  LocationModel,
} from 'src/app/core/models/ILocation';
import { ModuleModel } from 'src/app/core/models/IModule';
import { UnitModel } from 'src/app/core/models/IUnit';
import { wardModel } from 'src/app/core/models/IWard';
import { LocationService } from 'src/app/core/services/location.service';
import { ModuleService } from 'src/app/core/services/module.service';
import { UnitModulesService } from 'src/app/core/services/unit-modules.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-createlocation',
  templateUrl: './createlocation.component.html',
  styleUrls: ['./createlocation.component.scss'],
})
export class CreatelocationComponent {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  //@ViewChild('agGrid') agGrid: AgGridAngular;
  customStylesValidated = false;
  locationResponce: ILocationResponse;
  locationList: LocationModel[];
  locationModel: LocationModel[];
  wardList: wardModel[];
  objLocation: LocationModel;
  moduleList: ModuleModel[];
  pageTitle: String = 'Create Project';
  locID: string;
  form: FormGroup;
  model: any = {};
  unitList: UnitModel[];
  locationModel1: LocationModel;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _fb: FormBuilder,
    private unitService: UnitModulesService,
    private locationService: LocationService,
    private moduleService: ModuleService
  ) {
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
    });

    this.route.paramMap.subscribe((param) => {
      let id = param.get('id');
      if (id) {
        this.pageTitle = 'Edit Project';
        this.locationService.getLocationById(id).subscribe(
          (result) => {
            if (result.status === 200) {
              console.log(result.data[0]);
              this.locationModel1 = result.data[0];

              this.model = {
                locationName: result.data[0].locationName,
                wardName: result.data[0].zoneName,
                zoneName: result.data[0].zoneName,
              };

              this.form.patchValue({
                workCode: result.data[0].workCode,
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
                zoneName: result.data[0].wardName.zoneName,
                coordinates: result.data[0].coordinates,
              });

              console.log(this.locationModel1);
              this.locID = id;
            }
          },
          (err) => {}
        );
      }
    });
  }
  onWardChange(event: Event) {
    const ward = this.wardList.filter(
      (m) => m._id === (event.target as HTMLInputElement).value
    );
    let zoneName = ward[0].zoneName;
    console.log(zoneName);
    this.form.patchValue({
      zoneName: zoneName,
    });
  }
  getModules() {
    this.moduleService.getModules().subscribe(
      (result) => {
        if (result.status === 200) {
          this.moduleList = result.data;
        }
      },
      (err) => {}
    );
  }
  getLocation() {
    this.locationService.getLocations().subscribe(
      (result) => {
        if (result.status === 200) {
          this.locationList = result.data;
        }
      },
      (err) => {}
    );
  }
  onSubmit() {
    this.customStylesValidated = true;
    if (this.form.invalid) {
      return; // Exit the function if the form is invalid
    }
    if (this.locID) {
      var splitted = String(this.form.value.coordinates).split(',');
      console.log('Splitted ' + splitted);
      var cor1: any = [];
      var cor2: any = [];
      var cor: any = [];
      cor1[0] = Number(splitted[0]);
      cor1[1] = Number(splitted[1]);
      cor2[0] = Number(splitted[2]);
      cor2[1] = Number(splitted[3]);
      console.log('cor1 ' + cor1);
      console.log('cor2 ' + cor2);
      cor[0] = cor1;
      cor[1] = cor2;
      var coordinates1: any = [];
      coordinates1[0] = cor;
      console.log('cor ' + cor);
      this.objLocation = {
        _id: '0',
        locationID: 0,
        workCode: this.form.value.workCode,
        locationName: this.form.value.locationName,
        wardName: this.form.value.wardName,
        zoneName: this.form.value.zoneName,
        description: this.form.value.description,
        contractorName: this.form.value.contractorName,
        length: this.form.value.length,
        lengthUnit: this.form.value.lengthUnit,
        width: this.form.value.width,
        widthUnit: this.form.value.widthUnit,
        dlpPeriod: this.form.value.dlpPeriod,
        startDate: this.form.value.startDate,
        endDate: this.form.value.endDate,
        coordinates: coordinates1,
        createdOn: new Date(),
        createdBy: sessionStorage.getItem('UserName'),
        modifiedOn: new Date(),
        modifiedBy: sessionStorage.getItem('UserName'),
      };
      console.log(this.objLocation);

      this.locationService
        .updateLocation(this.locID, this.objLocation)
        .subscribe(
          (result) => {
            if (result.status === 201) {
              Swal.fire({
                text: 'Project Updated',
                icon: 'success',
              });
              this.router.navigate(['location/list']);
            }
          },
          (err) => {}
        );
    } else {
      this.objLocation = {
        _id: '0',
        locationID: 0,
        workCode: this.form.value.workCode,
        locationName: this.form.value.locationName,
        wardName: this.form.value.wardName,
        zoneName: this.form.value.zoneName,
        description: this.form.value.description,
        contractorName: this.form.value.contractorName,
        length: this.form.value.length,
        lengthUnit: this.form.value.lengthUnit,
        width: this.form.value.width,
        widthUnit: this.form.value.widthUnit,
        dlpPeriod: this.form.value.dlpPeriod,
        startDate: this.form.value.startDate,
        endDate: this.form.value.endDate,
        coordinates: this.form.value.coordinates,
        createdOn: new Date(),
        createdBy: sessionStorage.getItem('UserName'),
        modifiedOn: null,
        modifiedBy: null,
      };
      console.log(this.objLocation);
      this.locationService.addLocation(this.objLocation).subscribe(
        (result) => {
          debugger;
          if (result.status === 201) {
            Swal.fire({
              text: 'Project Added',
              icon: 'success',
            });
            this.router.navigate(['location/list']);
          }
        },
        (err) => {
          Swal.fire({
            text: 'this is error',
            icon: 'error',
          });
        }
      );
    }
  }

  coordinatesChange() {
    debugger;
  }

  Back() {
    this.router.navigate(['location/list']);
  }
  onReset() {
    this.customStylesValidated = false;
  }
}
