import { Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UnitModel } from 'src/app/core/models/IUnit';
import { UnitModulesService } from 'src/app/core/services/unit-modules.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-unit',
  templateUrl: './create-unit.component.html',
  styleUrls: ['./create-unit.component.scss'],
})
export class CreateUnitComponent implements OnInit {
  customStylesValidated = false;
  unitForm: FormGroup;
  unitModel: UnitModel;
  idforEdit: string;
  pageTitle: String = 'Create Unit';
  model: any = {};
  constructor(
    private formBuilder: FormBuilder,
    private unitService: UnitModulesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.unitForm = this.formBuilder.group({
      unitName: ['', Validators.required],
      unitDescription: ['', Validators.required],
      unitType: ['', Validators.required],
    });

    this.route.paramMap.subscribe((params) => {
      let id = params.get('id');
      if (id) {
        this.pageTitle = 'Edit Unit';
        this.unitService.getUnitById(id).subscribe(
          (result) => {
            if (result.status === 200) {
              this.model = result.data;
              this.unitModel = result.data[0];
              this.idforEdit = id;
              this.unitForm.patchValue({
                unitName: this.unitModel.unitName,
                unitDescription: this.unitModel.description,
                unitType: this.unitModel.type,
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
  onSubmit() {
    this.customStylesValidated = true;
    if (this.unitForm.valid) {
      if (this.idforEdit) {
        //console.log('update call');
        this.unitModel = {
          _id: '0',
          unitID: 0,
          unitName: this.unitForm.value.unitName,
          description: this.unitForm.value.unitDescription,
          type: this.unitForm.value.unitType,
          createdBy: sessionStorage.getItem('FullName'),
          createdOn: new Date(),
          modifiedBy: sessionStorage.getItem('FullName'),
          modifiedOn: new Date(),
        };

        this.unitService.updateUnit(this.idforEdit, this.unitModel).subscribe(
          (result) => {
            if (result.status === 201) {
              Swal.fire({
                text: 'Unit Updated!',
                icon: 'success',
              });
              this.router.navigate(['unit/list']);
            }
          },
          (err) => {
            Swal.fire({
              text: err,
              icon: 'error',
            });
          }
        );
      } else {
        console.log('save call');
        this.unitModel = {
          _id: '0',
          unitID: 0,
          unitName: this.unitForm.value.unitName,
          description: this.unitForm.value.unitDescription,
          type: this.unitForm.value.unitType,
          createdBy: sessionStorage.getItem('FullName'),
          // createdBy:sessionStorage.getItem('userName'),
          createdOn: new Date(),
          modifiedBy: null,
          modifiedOn: null,
        };

        this.unitService.checkUnit(this.unitModel).subscribe(
          (result) => {
            console.log('check', result);
            if (result.data != null) {
              Swal.fire({
                text: 'Unit Already Added',
                icon: 'error',
              });
            } else {
              this.unitService.addUnit(this.unitModel).subscribe(
                (result) => {
                  console.log('Add', result);
                  if (result.status === 201) {
                    Swal.fire({
                      text: 'Unit Added!',
                      icon: 'success',
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
          },
          (err) => {
            Swal.fire({
              text: err,
              icon: 'error',
            });
          }
        );
      }
    }
  }

  Back() {
    this.router.navigate(['unit/list']);
  }

  onReset() {
    this.customStylesValidated = false;
  }
}
