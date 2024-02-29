import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PandMAttribute } from 'src/app/core/models/IPandMAttribute';
import { PandmattributeService } from 'src/app/core/services/pandmattribute.service';
import { UnitModulesService } from 'src/app/core/services/unit-modules.service';
import { UnitModel } from 'src/app/core/models/IUnit';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-createpandmattribute',
  templateUrl: './createpandmattribute.component.html',
  styleUrls: ['./createpandmattribute.component.scss'],
})
export class CreatepandmattributeComponent implements OnInit {
  PandMAttributeModel: PandMAttribute;
  idforEdit: string;
  pageTitle: String = 'Create Dataentry Attribute';
  form: FormGroup;
  model: any = {};
  customStylesValidated = false;
  unitList: UnitModel[];

  constructor(
    private _fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pandmattributeservice: PandmattributeService,
    private unitService: UnitModulesService
  ) //private dialogService: DialogService,
  //private notificationService: NotificationService
  {
    this.unitService.getUnits().subscribe(
      (result) => {
        if (result.status === 200) {
          this.unitList = result.data;
        }
      },
      (err) => {
       // this.notificationService.warn(':: ' + err);
      }
    );
  }

  ngOnInit(): void {


    this.form = this._fb.group({
      description: ['', Validators.required],
      mandatory: ['',Validators.required],
      dataType: ['',Validators.required],
      maxLength: ['',Validators.required],
      integerPart: ['',Validators.required],
      decimalPart: ['',Validators.required],
      uom: ['',Validators.required],
      multiline: ['',Validators.required],
      maxValue: ['',Validators.required],
      minValue: ['',Validators.required],
      displayLabel: ['',Validators.required],
      isHidden:['0',Validators.required],
    
    });


    this.route.paramMap.subscribe((params) => {
      let id = params.get('id');
      if (id) {
        this.pageTitle = 'Edit Dataentry Attribute';
        this.pandmattributeservice.getPandMAttributeById(id).subscribe(
          (result) => {
            if (result.status === 200) {
              this.model = result.data;
              this.PandMAttributeModel = result.data[0];
              this.idforEdit = id;
              console.log(this.PandMAttributeModel);
              this.form.patchValue({
                description: this.PandMAttributeModel.description,
                mandatory:
                  this.PandMAttributeModel.mandatory === true ? '1' : '0',
                dataType: this.PandMAttributeModel.dataType,
                maxLength: this.PandMAttributeModel.maxLength.toString(),
                integerPart: this.PandMAttributeModel.integerPart.toString(),
                decimalPart: this.PandMAttributeModel.decimalPart.toString(),
                uom: this.PandMAttributeModel.uom._id,
                multiline:
                  this.PandMAttributeModel.multiline === true ? '1' : '0',
                maxValue: this.PandMAttributeModel.maxValue.toString(),
                minValue: this.PandMAttributeModel.maxLength.toString(),
                displayLabel: this.PandMAttributeModel.displayLabel,
                createdBy: sessionStorage.getItem('FullName'),
                createdOn: new Date(),
                modifiedBy: sessionStorage.getItem('FullName'),
                modifiedOn: new Date(),
              });
            }
          },
          (err) => {
           // this.notificationService.warn(':: ' + err);
          }
        );
      }
    });
  }

  onSubmit() {

    this.customStylesValidated = true;
    if (this.form.invalid) {
      return; // Exit the function if the form is invalid
    }
    if (this.form.valid) {
      if (this.idforEdit) {
        console.log("update call");
        this.PandMAttributeModel = {
          _id: "0",
          keyName:"",
          attributeID: 0,
          description: this.form.value.description,
          mandatory: this.form.value.mandatory,
          dataType: this.form.value.dataType,
          maxLength: Number(this.form.value.maxLength),
          integerPart: Number(this.form.value.integerPart),
          decimalPart: Number(this.form.value.decimalPart),
          uom: this.form.value.uom,
          multiline: this.form.value.multiline,
          maxValue: Number(this.form.value.maxValue),
          minValue: Number(this.form.value.minValue),
          displayLabel: this.form.value.displayLabel,
          isHidden:this.form.value.isHidden,
          createdBy:sessionStorage.getItem('FullName'),
          createdOn: new Date(),
          modifiedBy:sessionStorage.getItem('FullName'),
          modifiedOn: new Date(),
        }
        this.pandmattributeservice
          .updatePandMAttribute(this.idforEdit, this.PandMAttributeModel)
          .subscribe(
            (result) => {
              if (result.status == 201) {
                Swal.fire({
                  text: 'Data Entry Attribute Created',
                  icon: 'success',
                });                
                this.router.navigate(['location/dataentryassetpandmattributelist']);
              }
            },
            (err) => {
             // this.notificationService.warn(':: ' + err);
            }
          );
      } else {
        console.log(this.PandMAttributeModel)
        this.PandMAttributeModel = {
          _id: "0",
          keyName:"",
          attributeID: 0,
          description: this.form.value.description,
          mandatory: this.form.value.mandatory,
          dataType: this.form.value.dataType,
          maxLength: Number(this.form.value.maxLength),
          integerPart: Number(this.form.value.integerPart),
          decimalPart: Number(this.form.value.decimalPart),
          uom: this.form.value.uom,
          multiline: this.form.value.multiline,
          maxValue: Number(this.form.value.maxValue),
          minValue: Number(this.form.value.minValue),
          displayLabel: this.form.value.displayLabel,
          isHidden:this.form.value.isHidden,
          createdBy:sessionStorage.getItem('FullName'),
          createdOn: new Date(),
          modifiedBy:null,
          modifiedOn: null,
        }
        this.pandmattributeservice
          .AddPandMAttribute(this.PandMAttributeModel)
          .subscribe(
            (result) => {
              if (result.status === 201) {
               // this.notificationService.success(':: ' + result.message);
                this.router.navigate(['location/dataentryassetpandmattributelist']);
              }
            },
            (err) => {
             // this.notificationService.warn(':: ' + err);
            }
          );
      }
    }
  }
  Back() {
    this.router.navigate(['location/dataentryassetpandmattributelist']);
  }
}
