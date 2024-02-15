import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models/IUser';
import { UserService } from 'src/app/core/services/user.service';
import { RoleService } from 'src/app/core/services/role.service';
import { roleModel } from 'src/app/core/models/IRole';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.scss'],
})
export class CreateuserComponent implements OnInit {
  pageTitle: string = 'Create User';
  customStylesValidated = false;
  userModel: User;
  form: FormGroup;
  idforEdit: string;
  roleList: roleModel[];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private roleService: RoleService
  ) {
    this.roleService.getRoles().subscribe(
      (result) => {
        if (result.status === 200) {
          this.roleList = result.data;
        }
      },
      (err) => {
        Swal.fire({
          text: 'Error in Retriving Role',
          icon: 'error',
        });
      }
    );
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: [''],
      password: ['', Validators.required],
      role: [''],
      isActive: [''],
      mobileNo: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', Validators.required],
    });

    this.route.paramMap.subscribe((params) => {
      let id = params.get('id');
      if (id) {
        this.pageTitle = 'Edit User';
        this.userService.getUserById(id).subscribe(
          (result) => {
            if (result.status === 200) {
              this.userModel = result.data[0];
              console.log(this.userModel);
              this.idforEdit = id;
              this.form.patchValue({
                firstName: this.userModel.firstName,
                lastName: this.userModel.lastName,
                userName: this.userModel.userName,
                email: this.userModel.email,
                mobileNo: this.userModel.mobileNo,
                password: this.userModel.password,
                role: this.userModel.role._id,
                isActive: this.userModel.isActive === true ? '1' : '0',
                createdBy: sessionStorage.getItem('userName'),
                createdOn: new Date(),
                modifiedBy: sessionStorage.getItem('userName'),
                modifiedOn: new Date(),
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
    if (this.form.valid) {
      if (this.idforEdit) {
        this.userModel = {
          _id: '0',
          userID: 0,
          firstName: this.form.value.firstName,
          lastName: this.form.value.lastName,
          userName: this.form.value.userName,
          email: this.form.value.email,
          mobileNo: this.form.value.mobileNo,
          password: this.form.value.password,
          role: this.form.value.role,
          isActive: Boolean(this.form.value.isActive),
          locations: [],
          createdBy: sessionStorage.getItem('userName'),
          createdOn: new Date(),
          modifiedBy: sessionStorage.getItem('userName'),
          modifiedOn: new Date(),
        };

        this.userService.updateUser(this.idforEdit, this.userModel).subscribe(
          (result) => {
            if (result.status === 201) {
              Swal.fire({
                text: 'User Updated!',
                icon: 'success',
              });
              this.router.navigate(['user/list']);
            }
          },
          (err) => {
            Swal.fire({
              text: 'Error in Updating User',
              icon: 'error',
            });
          }
        );
      } else {
        console.log(this.userModel);
        this.userModel = {
          _id: '0',
          userID: 0,
          firstName: this.form.value.firstName,
          lastName: this.form.value.lastName,
          userName: this.form.value.userName,
          email: this.form.value.email,
          mobileNo: this.form.value.mobileNo,
          password: this.form.value.password,
          role: this.form.value.role,
          isActive: this.form.value.isActive,
          locations: [],
          createdBy: sessionStorage.getItem('userName'),
          createdOn: new Date(),
          modifiedBy: null,
          modifiedOn: null,
        };

        this.userService.checkUser(this.userModel).subscribe((result) => {
          if (result.data != null) {
            Swal.fire({
              text: 'UserName Already Taken',
              icon: 'error',
            });
          } else {
            this.userService.AddUser(this.userModel).subscribe(
              (result) => {
                if (result.status === 201) {
                  Swal.fire({
                    text: 'User Created!',
                    icon: 'success',
                  });
                  this.router.navigate(['user/list']);
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
  }

  Back() {
    this.router.navigate(['user/list']);
  }
  onReset() {
    this.customStylesValidated = false;
  }
}
