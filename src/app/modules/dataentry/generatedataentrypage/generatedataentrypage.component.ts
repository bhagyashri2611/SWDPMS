import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AssetModel } from 'src/app/core/models/IAsset';
import {
  AssetInstanceListModel,
  AssetInstanceModel,
  IAssetInstanceListResponce,
} from 'src/app/core/models/IAssetInstance';
import {
  DataEntryGroupModel,
  DataEntryModel,
  IDataEntryGroupModelResponce,
  IDataEntryModelResponce,
  AttributeValues,
} from 'src/app/core/models/IDataEntry';
import { LocationModel } from 'src/app/core/models/ILocation';
import { ModuleModel } from 'src/app/core/models/IModule';
import {
  IModulesInLocationResponse,
  ModulesInLocationModel,
} from 'src/app/core/models/IModules-In-Location';
import {
  CumulativeReportGroupByModel,
  ICumulativeReportGroupByModelResponse,
} from 'src/app/core/models/IReport';
import { AssetinstanceService } from 'src/app/core/services/assetinstance.service';
import { DataentryService } from 'src/app/core/services/dataentry.service';
import { LocationService } from 'src/app/core/services/location.service';
import { ModuleService } from 'src/app/core/services/module.service';
import { ReportService } from 'src/app/core/services/report.service';
// import { DialogService } from 'src/app/shared/mat-confirm-dialog/dialog.service';
// import { NotificationService } from 'src/app/shared/notification.service';
import { DataentryModule } from '../dataentry.module';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/IUser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-generatedataentrypage',
  templateUrl: './generatedataentrypage.component.html',
  styleUrls: ['./generatedataentrypage.component.scss'],
})
export class GeneratedataentrypageComponent implements OnInit {
  @Input() module: string;
  form: FormGroup;
  options: FormlyFormOptions = {};
  model: any = [];
  modelData: any = {};
  fields: FormlyFieldConfig[] = [];
  pageTitle: string = 'Data Entry Form';
  dataList: any;
  dataList1: any;
  moduleInLoc: ModulesInLocationModel;

  modulesInLocationResponse: IModulesInLocationResponse;
  assetInstanceResponse: IAssetInstanceListResponce;
  dataEntryGroupModelResponce: IDataEntryGroupModelResponce;
  dataEntryModelResponce: IDataEntryModelResponce;
  locationList: LocationModel[];
  moduleInLocationList: ModulesInLocationModel[] = [];
  moduleList: ModuleModel[] = [];
  assetList: AssetModel[] = [];
  dataEntryList: DataEntryModel[];
  assetInstanceList: AssetInstanceListModel[] = [];
  dataEntryDataList: DataEntryModel[] = [];

  cumulativeReportGroupByModelResponse: ICumulativeReportGroupByModelResponse;
  cumulativeReportGroupByModel: CumulativeReportGroupByModel[];
  dataentryGroup: DataEntryGroupModel;
  dataEntryModel: DataEntryModel;
  dataEntrySearchParams: DataEntryModel;
  objDataEntryModel: DataEntryModel;
  userData: User;
  objDatatest = {};

  public visible = false;

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  constructor(
    public dialogRef: MatDialogRef<GeneratedataentrypageComponent>,
    private route: ActivatedRoute,
    private router: Router,
    private moduleService: ModuleService,
    private locationService: LocationService,
    private reportService: ReportService,
    private userService: UserService,
    private assetInstanceService: AssetinstanceService,
    private dataEntryService: DataentryService // private dialogService: DialogService,
  ) // private notificationService: NotificationService
  {
    this.dataEntryService.dataEntrySearchParams.subscribe((result) => {
      this.dataEntrySearchParams = result;
      if (!this.dataEntrySearchParams.location) {
        this.router.navigate(['dataentry/create']);
      }
      this.locationService
        .getLocationById(this.dataEntrySearchParams.location)
        .subscribe(
          (result) => {
            if (result != null) {
              if (result.status === 200) {
                this.locationList = result.data;
                debugger;
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
            // this.notificationService.warn(':: ' + err);
          }
        );
    });

    this.userService.getUserById(sessionStorage.getItem('UserId')).subscribe((result) => {
      if(result != null) {
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

  logOut() {
    this.router.navigate(['/login/']);
    sessionStorage.clear();
    window.location.reload();
  }
  ngOnInit(): void {
    console.log(this.dataEntrySearchParams);
    this.form = new FormGroup({});
    this.dataEntryService.getData(this.dataEntrySearchParams).subscribe((result) => {
        debugger;
        if (result != null) {
          this.dataEntryGroupModelResponce = result[0];
          this.modulesInLocationResponse = result[1];
          this.dataEntryModelResponce = result[2];

          debugger;
          this.cumulativeReportGroupByModelResponse = result[3];
          if (this.modulesInLocationResponse.data.length > 0) {
            this.cumulativeReportGroupByModel =
              this.cumulativeReportGroupByModelResponse.data;
            this.moduleInLocationList = this.modulesInLocationResponse.data;

            this.dataentryGroup = this.dataEntryGroupModelResponce.data[0];
            debugger;
            //Asset Instance Loop
            this.moduleInLocationList.forEach((element) => {
              debugger;
              const ttlcumlativeVal = this.cumulativeReportGroupByModel.find(
                (c) => c._id.module === element._id
              );
              let cval = 0;
              let plannedQuantity = element.plannedQuantity;
              if (ttlcumlativeVal) {
                cval = Number(ttlcumlativeVal?.cumulativetotal);
              }

              if (this.dataEntryModelResponce.data.length > 0) {
                this.dataEntryList = this.dataEntryModelResponce.data;
                const data = this.dataEntryList.find(
                  (f) => f.module._id === element._id
                );
                if (data) {
                  if (
                    data.attributeValues.hasOwnProperty('cumulativequantity')
                  ) {
                    data.attributeValues['cumulativequantity'] = cval;
                  }

                  if (data.attributeValues.hasOwnProperty('totalquantity')) {
                    data.attributeValues['totalquantity'] = element.quantity;
                  }

                  if (data.attributeValues.hasOwnProperty('plannedquantity')) {
                    data.attributeValues['plannedquantity'] =
                      element.plannedQuantity;
                  }
                  this.objDatatest[element._id] = [data.attributeValues];
                } else {
                  const objDeflt = {
                    consumedquantity: 0,
                    cumulativequantity: cval,
                    totalquantity: element.quantity,
                    remark: '',
                    plannedquantity: element.plannedQuantity,
                  };
                  // const dd = this.dataentryGroup.dataEntryScreen[0]
                  // if (dd.hasOwnProperty("cumulativequantity")) {
                  //   dd["cumulativequantity"] = cval
                  // }
                  this.objDatatest[element._id] = [objDeflt];
                }
              } else {
                const objDeflt = {
                  consumedquantity: 0,
                  cumulativequantity: cval,
                  totalquantity: element.quantity,
                  remark: '',
                  plannedquantity: element.plannedQuantity,
                };
                // const dd = this.dataentryGroup.dataEntryScreen[0]
                // if (dd.hasOwnProperty("cumulativequantity")) {
                //   dd["cumulativequantity"] = cval
                //   console.log(cval)
                // }
                this.objDatatest[element._id] = [objDeflt];
                // this.objDatatest[element._id] = this.dataentryGroup.dataEntryScreen;
              }

              this.model = this.objDatatest;
              this.dataentryGroup.attributes=this.dataentryGroup.attributes.filter(f=>f.pandmAttribute.mandatory===true)

              let fieldGroupData = [];
              //P&M Attributes Loop
              debugger;
              this.dataentryGroup.attributes.forEach((inpitFields) => {
                if (inpitFields.keyName === 'consumedquantity') {
                  let InptData = {
                    //className: "col-sm-2",
                    type: 'input',
                    key: inpitFields.keyName,
                    //  wrappers: ['form-field-horizontal'],
                    templateOptions: {
                      type: inpitFields.pandmAttribute.dataType,
                      label: inpitFields.pandmAttribute.description,
                      // +(inpitFields.keyName === 'consumedquantity'
                      //   ? '( in ' + element.units.unitName + ')'
                      //   : '')
                      change: (field, $event) => {
                        // console.log(field),
                        //  console.log($event.target)
                        //this.parseMarkDownText(field.form.controls.editor.value);
                      },
                    },
                  };
                  fieldGroupData.push(InptData);
                } else if (inpitFields.keyName === 'cumulativequantity') {
                  let InptData = {
                    //className: "col-sm-2",
                    type: 'input',
                    key: inpitFields.keyName,
                    //  wrappers: ['form-field-horizontal'],
                    defaultValue: cval,
                    templateOptions: {
                      type: inpitFields.pandmAttribute.dataType,
                      label: inpitFields.pandmAttribute.description,
                      disabled: true,
                    },
                  };
                  fieldGroupData.push(InptData);
                } else if (inpitFields.keyName === 'plannedquantity') {
                  let InptData = {
                    //className: "col-sm-2",
                    type: 'input',
                    key: inpitFields.keyName,
                    //  wrappers: ['form-field-horizontal'],
                    defaultValue: plannedQuantity,
                    templateOptions: {
                      type: inpitFields.pandmAttribute.dataType,
                      label: inpitFields.pandmAttribute.description,
                      disabled: true,
                    },
                  };
                  fieldGroupData.push(InptData);
                } else if (inpitFields.keyName === 'totalquantity') {
                  // let InptData = {
                  //   //className: "col-sm-2",
                  //   type: 'input',
                  //   key: inpitFields.keyName,
                  // //  wrappers: ['form-field-horizontal'],
                  //   templateOptions: {
                  //     type: inpitFields.pandmAttribute.dataType,
                  //     label: inpitFields.pandmAttribute.description,
                  //     disabled: true,
                  //   },
                  // };
                  // let InputData = {
                  //   key: inpitFields.keyName,
                  //   //wrappers: ['form-field-horizontal'],
                  //   type: 'input',
                  //   fieldGroup: [
                  //     {
                  //       className: 'col-sm-2', // Apply class to the label
                  //       key: 'label',
                  //       template: `<label for="${inpitFields.keyName}">{{to.label}}</label>`,
                  //     },
                  //     {
                  //       className: 'col-sm-8', // Apply class to the input field
                  //       key: 'input',
                  //       type: inpitFields.pandmAttribute.dataType,
                  //       templateOptions: {
                  //         label: inpitFields.pandmAttribute.description,
                  //         disabled: true,
                  //       },
                  //     },
                  //   ],
                  // };

                  let InputData = {
                    //className: "col-sm-2",
                    type: 'input',
                    key: inpitFields.keyName,
                    //  wrappers: ['form-field-horizontal'],
                    defaultValue: element.quantity,
                    templateOptions: {
                      type: inpitFields.pandmAttribute.dataType,
                      label: inpitFields.pandmAttribute.description,
                      disabled: true,
                    },
                  };

                  fieldGroupData.push(InputData);
                } else if (inpitFields.keyName === 'remark') {
                  let InptData = {
                    //className: "col-sm-2",
                    type: 'textarea',
                    key: inpitFields.keyName,
                    // wrappers: ['form-field-horizontal'],
                    templateOptions: {
                      label: inpitFields.pandmAttribute.description,
                      row: 10,
                    },
                  };
                  fieldGroupData.push(InptData);
                } else {
                  let InptData = {
                    //className: "col-sm-2",
                    type: 'input',
                    key: inpitFields.keyName,
                    // wrappers: ['form-field-horizontal'],
                    templateOptions: {
                      type: inpitFields.pandmAttribute.dataType,
                      label:
                        inpitFields.pandmAttribute.description +
                        (inpitFields.keyName === 'consumedquantity'
                          ? '( in ' + element.units.unitName + ')'
                          : ''),
                    },
                    hideExpression: (
                      model: any,
                      formState: any,
                      field: FormlyFieldConfig
                    ) => {
                      // access to the main model can be through `this.model` or `formState` or `model
                      //  if (formState.mainModel && formState.mainModel.city) {
                      //  return formState.mainModel
                      // }
                      return inpitFields.pandmAttribute.isHidden;
                    },
                  };
                  fieldGroupData.push(InptData);
                }
              });
              let fieldData = {
                key: element._id,
                type: 'repeat',
                templateOptions: {
                  addText: element.module.moduleName,
                },
                fieldArray: {
                  fieldGroup: fieldGroupData,
                },
              };
              this.fields.push(fieldData);
              debugger;
            });
          }
          this.options = {
            formState: {
              mainModel: this.model,
            },
          };
          // this.fields= [
          //   {
          //     key: 'name',
          //     type: 'input',
          //     templateOptions: {
          //       label: 'Name',
          //       placeholder: 'Enter your name',
          //       required: true,
          //     },
          //   },
          //   {
          //     key: 'email',
          //     type: 'input',
          //     templateOptions: {
          //       type: 'email',
          //       label: 'Email',
          //       placeholder: 'Enter your email',
          //       required: true,
          //     },
          //   },
          //   {
          //     key: 'age',
          //     type: 'input',
          //     templateOptions: {
          //       type: 'number',
          //       label: 'Age',
          //       placeholder: 'Enter your age',
          //       required: true,
          //     },
          //   },
          // ];
          // this.model={}
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

  dt = [];
  onSubmit() {
    // console.log(this.fields)
    let locationID = String(this.dataEntrySearchParams.location);
    let moduleID = String(this.dataEntrySearchParams.module);
    let assetInstanceID = String(this.dataEntrySearchParams.assetInstance);
    this.fields.forEach((element) => {
      let aiID: any = element.key;
      this.objDataEntryModel = {
        location: this.dataEntrySearchParams.location,
        module: aiID,
        assetInstance: aiID,
        dataDate: this.dataEntrySearchParams.dataDate,
        attributeValues: [
          Object.assign(element.model[0], element.formControl.value[0]),
        ],
        locationName: this.locationList[0].locationName,
        moduleName: element.templateOptions['addText'],
        assetnstanceName: null,
        ward: this.locationList[0].wardName.wardName,
        zone: this.locationList[0].zoneName,
        workCode: this.locationList[0].workCode,
        contractorName: this.locationList[0].contractorName,
        roadStatus: this.locationList[0].contractorName,
        assignedSE: this.userData,
        createdBy: sessionStorage.getItem('FullName'),
        createdOn: new Date(),
        modifiedBy: null,
        modifiedOn: null,
        modifiedByContractor: null,
      };
      debugger;

      this.dataEntryService.saveData(this.objDataEntryModel).subscribe(
        (result) => {
          if (result.status === 201) {
            let route = 'location/addmoduledetails/' +
              String(this.dataEntrySearchParams.location);
            this.router.navigate([route]).then(() => {
              // Reload the page after navigation
              window.location.reload();
            });

            Swal.fire({
              text: 'Changes have been saved!',
              icon: 'success',
            });
          }
        },
        (err) => {
          // this.notificationService.success(':: ' + err.message);
        }
      );
    });

    this.dialogRef.close();
  }

  Back() {
    this.dialogRef.close();
  }
  mapValues(data: any) {
    let AttVal: AttributeValues[] = [];
    for (let key of data) {
      let dt = {
        keyName: key,
        keyValue: data[key],
      };
      AttVal.push(dt);
      // this.valuesBlock.Data.push(this.valuesData);
    }
  }
}
