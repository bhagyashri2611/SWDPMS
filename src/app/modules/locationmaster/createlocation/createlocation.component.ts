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

import { PandmattributeService } from 'src/app/core/services/pandmattribute.service';
import { PandmattributegroupService } from 'src/app/core/services/pandmattributegroup.service';
import Swal from 'sweetalert2';


import * as XLSX from 'xlsx';
type AOA = any[][];

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
  pageTitle: String = 'Create Road';
  locID: string;
  form: FormGroup;
  model: any = {};
  unitList: UnitModel[];
  locationModel1: LocationModel;
  upload = false;
  userRole:String;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _fb: FormBuilder,
    private unitService: UnitModulesService,
    private locationService: LocationService,
    private moduleService: ModuleService,
    private pAndmAttributeService: PandmattributeService,
    private pandmattributegroupService: PandmattributegroupService
  ) {
    debugger;
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
      roadType:[''],
      remarks:['']
    });
    this.userRole=sessionStorage.getItem("UserRole")
    this.route.paramMap.subscribe((param) => {
      let id = param.get('id');
      if (id) {
        this.pageTitle = 'Edit Project';
        this.locationService.getLocationById(id).subscribe((result) => {
          if(result != null){
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
                status: result.data[0].status,
                roadType:result.data[0].roadType,
                remarks:result.data[0].remarks
              });

              console.log(this.locationModel1);
              this.locID = id;
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

    this.getModules();
    this.getPandMAttibutes();
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

  moduleIdList: any = [];
  getModules() {
    this.moduleIdList = [];
    this.moduleService.getModules().subscribe((result) => {
        if (result.status === 200) {
          this.moduleList = result.data;

          this.moduleIdList = this.moduleList.map((obj) => {
            // Create a new object without the "name" property
            const { _id, ...rest } = obj;
            return _id;
          });
        }
      },
      (err) => {
        // this.notificationService.warn(':: ' + err);
      }
    );
  }

  dataEntryModelUpload:any;
  pandmAttrList: any;
  pandmAttr: any = [];
  getPandMAttibutes() {
    this.pAndmAttributeService.getPandMAttribute().subscribe(
      (result) => {
        if (result.status === 200) {
          debugger;
          this.pandmAttrList = result.data;
        }
      },
      (err) => {
        // this.notificationService.warn(':: ' + err);
      }
    );
  }

  getLocation() {
    this.locationService.getLocations().subscribe((result) => {
      if(result != null){
        if (result.status === 200) {
          this.locationList = result.data;
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
        status: this.form.value.status,
        quater1EndDate:null,
        quater2EndDate:null,
        quater3EndDate:null,
        quater4EndDate:null,
        quater5EndDate:null,
        coordinates: this.form.value.coordinates,
        remarks:this.form.value.remarks,
        roadType: this.form.value.roadType,
        //   latitude: Number(this.form.value.latitude),
        // longitude: Number(this.form.value.longitude),
        createdOn: new Date(),
        createdBy: sessionStorage.getItem('FullName'),
        modifiedOn: new Date(),
        modifiedBy: sessionStorage.getItem('FullName'),
      };
      console.log(this.objLocation);
      debugger;

      this.locationService.updateLocation(this.locID, this.objLocation).subscribe((result) => {
        if(result != null){
          if (result.status === 201) {
            Swal.fire({
              text: 'Road Updated',
              icon: 'success',
            });
            this.router.navigate(['location/list']);
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
        quater1EndDate:null,
        quater2EndDate:null,
        quater3EndDate:null,
        quater4EndDate:null,
        quater5EndDate:null,
        coordinates: this.form.value.coordinates,
        remarks:this.form.value.remarks,
        status:this.form.value.status,
        roadType:this.form.value.roadType,
        //latitude: Number(this.form.value.latitude),
        // longitude: Number(this.form.value.longitude),
        createdOn: new Date(),
        createdBy: sessionStorage.getItem('FullName'),
        modifiedOn: new Date(),
        modifiedBy: sessionStorage.getItem('FullName'),
      };
      debugger;
      console.log(this.objLocation);
     this.addLocation(this.objLocation);
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

  data: AOA = [
    [1, 2],
    [3, 4],
  ];

  uploadListener(event: any): void {
    const target: DataTransfer = <DataTransfer>event.target;
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });

      console.log('Excel Data' + this.data);
      if(this.data) {
        this.upload = true;
      }
    };
    reader.readAsBinaryString(target.files[0]);
  }

  UploadClick() {
    this.getDataRecordsArray();
  }
  startDate_info: Date;
  endDate_info: Date;
  async getDataRecordsArray() {
    
    for (let i = 1; i < this.data.length; i = i + 1) {
      let j = i + 1;
      
      if (this.data[i].length) {
        debugger;
        if (this.data[i][0] != '') {
          debugger;

          var startutc_days = Math.floor(this.data[i][11] - 25569);
          var startutc_value = startutc_days * 86400;
          this.startDate_info = new Date(startutc_value * 1000);
          var startdate1 = new Date(
            this.startDate_info.getFullYear(),
            this.startDate_info.getMonth(),
            this.startDate_info.getDate()
          );
          var startDate = moment(startdate1).format('YYYY-MM-DD');
          var endutc_days = Math.floor(this.data[i][12] - 25569);
          var endutc_value = endutc_days * 86400;
          this.endDate_info = new Date(endutc_value * 1000);
          var enddate1 = new Date(
            this.endDate_info.getFullYear(),
            this.endDate_info.getMonth(),
            this.endDate_info.getDate()
          );
          var endDate = moment(enddate1).format('YYYY-MM-DD');
          var ward: any = this.wardList.filter(w => w.wardName === this.data[i][2] );
          var unit: any = this.unitList.filter(u  => u.unitName === "meter" );
            debugger;
          let attr1 = {
            locationID: 0,
            workCode: this.data[i][0],
            locationName: this.data[i][1],
            wardName: ward[0]._id,
            zoneName: this.data[i][3],
            description: this.data[i][4],
            contractorName: this.data[i][5],
            length: this.data[i][6],
            lengthUnit: unit[0]._id,
            width: this.data[i][8],
            widthUnit: unit[0]._id,
            dlpPeriod: this.data[i][10],

            startDate: new Date(startDate),
            endDate: new Date(endDate),

            quater1EndDate:null,
            quater2EndDate:null,
            quater3EndDate:null,
            quater4EndDate:null,
            quater5EndDate:null,
            coordinates: this.data[i][13],
            remarks:this.data[i][14],
            status:this.data[i][15],
            roadType:this.data[i][16],

            createdOn: new Date(),
            createdBy: sessionStorage.getItem('FullName'),
            modifiedOn: new Date(),
            modifiedBy: sessionStorage.getItem('FullName'),
          };
          debugger;
          console.log('attr1', attr1);
          
          debugger;
          this.dataEntryModelUpload = { attributeValues: [attr1]  };

          debugger;

          this.addLocation(this.dataEntryModelUpload.attributeValues[0])
          
        }
      }
    }
  }

  addLocation(objLocation) {
    debugger;
    this.objLocation = objLocation;
    this.locationService.addLocation(this.objLocation).subscribe((result) => {
      debugger;
      if(result != null) {
        if (result.status === 201) {
          var loc: any = result.data;
          let locID = loc._id;
          if (locID) {
            if (this.moduleList.length > 0) {
              debugger;
              const data = {
                location: locID,
                module: this.moduleIdList,
                createdOn: new Date(),
                createdBy: sessionStorage.getItem('FullName'),
                modifiedOn: new Date(),
                modifiedBy: sessionStorage.getItem('FullName'),
                _id: '0',
                isActive: 1,
              };
              debugger;
              this.locationService.addModulesInLocation(locID, data).subscribe((result) => {
                    debugger;
                    if(result != null){
                      let objDefaulyM = {}
                      this.pandmAttr=[]
                      this.pandmAttrList.forEach((pm) => {
                        debugger;
                        const kName = pm.displayLabel.replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s/g, '').toLowerCase();
                        let obj = {   keyName: kName,  pandmAttribute: pm};
                        debugger;
                        this.pandmAttr.push(obj);
                        objDefaulyM[kName] = ' ';
                      });
  
                      if (result.status === 201) {
                        const objSaveModel = {
                          groupName: this.objLocation.locationName,
                          module: locID,
                          asset: '',
                          isLevelData: this.form.value.islevel,
                          levelScale: this.form.value.levelscale,
                          levelScaleValue: this.form.value.levelscalevalue,
                          attributes: this.pandmAttr,
                          dataEntryScreen: [objDefaulyM],
                          createdBy: sessionStorage.getItem('FullName'),
                          createdOn: new Date(),
                          modifiedBy: null,
                          modifiedOn: null,
                        };
                        this.pandmattributegroupService.addDataEntryGroup(objSaveModel).subscribe((result) => {
                              debugger;
                              if (result.status === 201) {
                                // this.notificationService.success(
                                //   ':: ' + 'Location Created Successfully!'
                                // );
                              }
                            },
                            (err) => {
                              // this.notificationService.warn(':: ' + err);
                            }
                          );
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
                    // this.notificationService.warn(':: ' + err);
                  }
                );
            }
          }
          (err) => {
            // this.notificationService.warn(':: ' + err);
          };
          this.upload = false; 
          Swal.fire({
            text: 'Road Created',
            icon: 'success',
          });
          this.router.navigate(['location/list']);

        }
        if (result.status === 202) {
          // this.notificationService.success(':: ' + result.message);
          // this.router.navigate(['location/list'])
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
        // this.notificationService.warn(':: ' + err);
      }
    );

  }
  logOut(){
    this.router.navigate(["/login/"]);
    sessionStorage.clear();
    window.location.reload();
  }
}
