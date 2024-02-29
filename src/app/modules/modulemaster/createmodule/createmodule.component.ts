import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IModuleResponce, ModuleModel } from 'src/app/core/models/IModule';
import { ModuleService } from 'src/app/core/services/module.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-createmodule',
  templateUrl: './createmodule.component.html',
  styleUrls: ['./createmodule.component.scss'],
})
export class CreatemoduleComponent implements OnInit {
  customStylesValidated = false;
  moduleResponce: IModuleResponce;
  moduleList: ModuleModel[];
  objmodule: ModuleModel;
  pageTitle: string = 'Create Task';
  moduleID: string;
  form: FormGroup;
  model: any = {};
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private moduleService: ModuleService
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      moduleName: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required],
    });

    this.route.paramMap.subscribe((param) => {
      let id = param.get('id');
      if (id) {
        this.pageTitle = 'Edit Task';
        this.moduleService.getModuleByID(id).subscribe(
          (result) => {
            if (result.status === 200) {
              this.model = result.data[0];
              this.moduleID = id;
              console.log(this.model);
              console.log(this.model.moduleName);
              this.form.patchValue({
                moduleName: this.model.moduleName,
                description: this.model.description,
                priority: this.model.priority,
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

  onSubmit(): void {
    this.customStylesValidated = true;
    if (this.form.invalid) {
      return; // Exit the function if the form is invalid
    }
    if (this.moduleID) {
      this.objmodule = {
        moduleID: 1,
        moduleName: this.form.value.moduleName,
        description: this.form.value.description,
        priority: Number(this.form.value.priority),
        createdBy: null,
        createdOn: null,
        modifiedBy: sessionStorage.getItem('FullName'),
        modifiedOn: new Date(),
        _id: '0',
        assets: null,
      };
      console.log(this.objmodule);

      this.moduleService.updateModule(this.moduleID, this.objmodule).subscribe(
        (result) => {
          if (result.status === 201) {
            Swal.fire({
              text: 'Task Updated!',
              icon: 'success',
            });
            this.router.navigate(['module/list']);
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
      this.objmodule = {
        moduleID: 1,
        moduleName: this.form.value.moduleName,
        description: this.form.value.description,
        priority: Number(this.form.value.priority),
        createdBy: sessionStorage.getItem('FullName'),
        createdOn: new Date(),
        modifiedBy: null,
        modifiedOn: null,
        _id: '0',
        assets: null,
      };

      this.moduleService.checkModule(this.objmodule).subscribe((result) => {
        if (result.data != null) {
          Swal.fire({
            text: 'Task Already Added',
            icon: 'error',
          });
        } else {
          this.moduleService.AddModule(this.objmodule).subscribe(
            (result) => {
              if (result.status === 201) {
                Swal.fire({
                  text: 'Task Added',
                  icon: 'success',
                });
                this.router.navigate(['module/list']);
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
  }
  Back() {
    this.router.navigate(['module/list']);
  }
  onReset() {
    this.customStylesValidated = false;
  }
}
