import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetModel } from 'src/app/core/models/IAsset';
import { ModuleModel } from 'src/app/core/models/IModule';
import { AssetModulesService } from 'src/app/core/services/asset-modules.service';
import { ModuleService } from 'src/app/core/services/module.service';
// import { DialogService } from 'src/app/shared/mat-confirm-dialog/dialog.service';
// import { NotificationService } from 'src/app/shared/notification.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { PandMAttribute } from 'src/app/core/models/IPandMAttribute';
import { PandmattributeService } from 'src/app/core/services/pandmattribute.service';
import * as moment from 'moment';
import { DataEntryGroupModel } from 'src/app/core/models/IDataEntry';
import { PandmattributegroupService } from 'src/app/core/services/pandmattributegroup.service';
import { LocationService } from 'src/app/core/services/location.service';
import { LocationModel } from 'src/app/core/models/ILocation';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dataentrypandattributegroup',
  templateUrl: './dataentrypandattributegroup.component.html',
  styleUrls: ['./dataentrypandattributegroup.component.scss'],
})
export class DataentrypandattributegroupComponent implements OnInit {
  locationList: LocationModel[];
  dataentryGroupList: DataEntryGroupModel[];
  dataentryGroupModel: DataEntryGroupModel;
  moduleList: ModuleModel[];
  assetModel: AssetModel;
  pandmAttrList: PandMAttribute[];
  selectedpandmAttrList: PandMAttribute[] = [];
  idforEdit: string;
  pageTitle: string = 'Attach Dataentry Attribute';
  form: FormGroup;
  model: any = {};
  // options: FormlyFormOptions = {};
  // fields: FormlyFieldConfig[] = [];
  isLevel: boolean = false;
  constructor(
    private _fb: FormBuilder,
    private route: ActivatedRoute,
    private moduleService: ModuleService,
    private router: Router,
    private assetService: AssetModulesService,
    private pandmattributeService: PandmattributeService,
    private pandmattributegroupService: PandmattributegroupService,
    //  private dialogService: DialogService,
    private locationService: LocationService // private notificationService: NotificationService
  ) {
    this.locationService.getLocations().subscribe((result) => {
      if(result != null) {
        if (result.status === 200) {
          this.locationList = result.data;
          this.locationList=this.locationList.sort((a, b) => (String(a.locationName)).localeCompare(String(b.locationName)));
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
        console.log(err);
      }
    );
    this.moduleService.getModules().subscribe(
      (result) => {
        if (result.status === 200) {
          this.moduleList = result.data;
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

  ngOnInit(): void {
    this.form = this._fb.group({
      module: ['', Validators.required],
      // islevel: ['0', Validators.required],
      // levelscale: ['0', Validators.required],
      // levelscalevalue: ['0', Validators.required],
      // pandmattribute: ['0', Validators.required],
    });

    this.pandmattributeService.getPandMAttribute().subscribe(
      (result) => {
        if (result.status === 200) {
          this.pandmAttrList = result.data;
        }
      },
      (err) => {
        alert(err);
      }
    );

    // Check id in current route if exist it edit else create
    this.route.paramMap.subscribe((params) => {
      let id = params.get('id');
      this.idforEdit = id;
      if (id) {
        debugger;
        this.pandmattributegroupService.getDataentryGroupByID(id).subscribe(
          (result) => {
            if (result.status === 200) {
              this.dataentryGroupList = result.data;
              this.dataentryGroupModel = result.data[0];
              if (this.dataentryGroupModel.isLevelData === 1) {
                this.isLevel = true;
              } else {
                this.isLevel = false;
                if (this.dataentryGroupModel.attributes) {
                  this.dataentryGroupModel.attributes.forEach((f) => {
                    this.selectedpandmAttrList.push(f.pandmAttribute);
                  });
                  if (this.selectedpandmAttrList) {
                    this.pandmAttrList = this.pandmAttrList.filter(
                      (n) =>
                        !this.selectedpandmAttrList.some(
                          (n2) => n._id == n2._id
                        )
                    );
                  }
                }
              }
              this.idforEdit = id;
              console.log(this.dataentryGroupModel);
              this.pageTitle = 'Edit Attached Dataentry Attribute for : '+  this.dataentryGroupModel.module.locationName;

              debugger;
              this.form.patchValue({
                module: this.dataentryGroupModel.module._id,
                // islevel: this.dataentryGroupModel.isLevelData,
                // levelscale: this.dataentryGroupModel.levelScale,
                // levelscalevalue: this.dataentryGroupModel.levelScaleValue,
                // pandmattribute:
                //   this.dataentryGroupModel.attributes[0].pandmAttribute._id,
              });
              debugger;
            }
          },
          (err) => {
            // this.notificationService.warn(':: '+err);
          }
        );
      }
    });
  }

  onDDLIsLevelChange(isLevel: string) {
    if (isLevel === '0') {
      this.isLevel = false;
    } else {
      this.isLevel = true;
    }
  }
  submit() {
    const pandmAttr = [];
    const defaultModel = [];
    let objDefaulyM = {};
    if (this.isLevel === false) {
      this.selectedpandmAttrList.forEach((pm) => {
        const kName = pm.displayLabel
          .replace(/[^a-zA-Z0-9 ]/g, '')
          .replace(/\s/g, '')
          .toLowerCase();
        let obj = {
          keyName: kName,
          pandmAttribute: pm,
        };
        pandmAttr.push(obj);
        objDefaulyM[kName] = ' ';
      });
      const objSaveModel = {
        groupName: (document.getElementById('module') as HTMLSelectElement)
          .selectedOptions[0].innerText,
        module: this.form.value.module,
        asset: '',
        isLevelData:this.form.value.islevel,
        levelScale:this.form.value.levelscale,
        levelScaleValue:this.form.value.levelscalevalue,
        attributes: pandmAttr,
        dataEntryScreen: [objDefaulyM],
        createdBy: sessionStorage.getItem('FullName'),
        createdOn: new Date(),
        modifiedBy: null,
        modifiedOn: null,
      };
      debugger;
      if (this.idforEdit) {
        this.pandmattributegroupService
          .updateDataEntryGroup(this.idforEdit, objSaveModel)
          .subscribe(
            (result) => {
              if (result.status === 201) {
                Swal.fire({
                  text: 'Attached Tasks !',
                  icon: 'success',
                });                 
                this.router.navigate([
                  'location/dataentrygrouplist',
                ]);
              }
            },
            (err) => {
              Swal.fire({
                text: err.message,
                icon: 'error',
              });             
            }
          );
      } else {
        this.pandmattributegroupService
          .addDataEntryGroup(objSaveModel)
          .subscribe(
            (result) => {
              debugger;
              if (result.status === 201) {
                Swal.fire({
                  text: 'Attached Tasks !',
                  icon: 'success',
                });                
                this.router.navigate([
                  'location/dataentrygrouplist',
                ]);
              }
            },
            (err) => {
              Swal.fire({
                text: err.message,
                icon: 'error',
              }); 
            }
          );
      }
    } 
    // else {
    //   const scale = this.form.value.levelscale;
    //   const scaleVal = this.form.value.levelscalevalue;
    //   const pmAttrbute = this.form.value.pandmattribute;
    //   console.log(pmAttrbute);
    //   if (scale === 'min') {
    //     const timeIntrval = 1440 / scaleVal;
    //     console.log(timeIntrval);
    //     const timeArr = [];
    //     let minuteIntrvl = 0;
    //     for (let i = 0; i < timeIntrval; i++) {
    //       const minute = moment.duration('00:00').add(minuteIntrvl, 'm');
    //       let hr = minute.hours();
    //       let min = minute.minutes();
    //       const timeString = `${hr < 10 ? '0' + hr : hr}:${
    //         min < 10 ? '0' + min : min
    //       }`;
    //       timeArr.push(timeString);
    //       minuteIntrvl = minuteIntrvl + Number(scaleVal);
    //       let obj = {
    //         keyName: timeString,
    //         pandmAttribute: pmAttrbute,
    //       };
    //       pandmAttr.push(obj);
    //       objDefaulyM[timeString] = null;
    //     }
    //     console.log(timeArr);
    //   } else {
    //     const timeIntrval = 24 / scaleVal;
    //     console.log(timeIntrval);
    //     const timeArr = [];
    //     let minuteIntrvl = 0;
    //     for (let i = 0; i < timeIntrval; i++) {
    //       const minute = moment.duration('00:00').add(minuteIntrvl, 'h');
    //       let hr = minute.hours();
    //       let min = minute.minutes();
    //       const timeString = `${hr < 10 ? '0' + hr : hr}:${
    //         min < 10 ? '0' + min : min
    //       }`;
    //       timeArr.push(timeString);
    //       minuteIntrvl = minuteIntrvl + Number(scaleVal);
    //       let obj = {
    //         keyName: timeString,
    //         pandmAttribute: pmAttrbute,
    //       };
    //       pandmAttr.push(obj);
    //       objDefaulyM[timeString] = null;
    //     }
    //   }
    //   const objSaveModel = {
    //     groupName: (document.getElementById('module') as HTMLSelectElement)
    //       .selectedOptions[0].innerText,
    //     // module: this.form.value.module,
    //     asset: '',
    //     //  isLevelData:this.form.value.islevel,
    //     //  levelScale:this.form.value.levelscale,
    //     //  levelScaleValue:this.form.value.levelscalevalue,
    //     attributes: pandmAttr,
    //     dataEntryScreen: [objDefaulyM],
    //     createdBy: sessionStorage.getItem('userName'),
    //     createdOn: new Date(),
    //     modifiedBy: null,
    //     modifiedOn: null,
    //   };

    //   if (this.idforEdit) {
    //     this.pandmattributegroupService
    //       .updateDataEntryGroup(this.idforEdit, objSaveModel)
    //       .subscribe(
    //         (result) => {
    //           if (result.status === 201) {
    //             // this.notificationService.success(':: ' + result.message);
    //             this.router.navigate([
    //               'pandmattributegroup/dataentrypandmgrouplist',
    //             ]);
    //           }
    //         },
    //         (err) => {
    //           // this.notificationService.warn(':: ' + err);
    //         }
    //       );
    //   } else {
    //     this.pandmattributegroupService
    //       .addDataEntryGroup(objSaveModel)
    //       .subscribe(
    //         (result) => {
    //           if (result.status === 201) {
    //             // this.notificationService.success(':: ' + result.message);
    //             this.router.navigate([
    //               'pandmattributegroup/dataentrypandmgrouplist',
    //             ]);
    //           }
    //         },
    //         (err) => {
    //           // this.notificationService.warn(':: ' + err);
    //         }
    //       );
    //   }
    // }
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
  Back() {
    this.router.navigate(['location/dataentrygrouplist']);
  }
}
