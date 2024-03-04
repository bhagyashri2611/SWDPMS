import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginModel } from '../../../core/models/loginModel';
import { DbCallingService } from '../../../core/services/db-calling.service'

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.scss']
})
export class UserloginComponent {
  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  loginModel: LoginModel;
  result: any = [];
  UOTP: number = 0;
  resMsg: any = ""
  otpRes: number = 0;
  get f() {
    return this.loginForm.controls;
  }
  constructor(
    private router: Router,
    private dbCallingService: DbCallingService,
    private fb: FormBuilder

  ) {

  }

  ngOnInit() {
    this.loginModel = new LoginModel();
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  loginClick() {
    let obj = {
      "MobileNo": this.loginForm.value.username,
      // "IMEINo": null
    }
    this.dbCallingService.GenerateOTP(obj).subscribe((res) => {
      if (res.servicesesponse === 1) {
        debugger;
        this.otpRes = res.servicesesponse;
        this.UOTP = res.otp
      }
      else {
        console.log(res)
        Swal.fire({
          text: res.msg,
          icon: 'warning'
        });
      }
    },
      (err) => {

        Swal.fire({
          text: "Something went wrong!!",
          icon: 'warning'
        });
      }
    );
    this.loginForm.patchValue({
      "username": obj.MobileNo,
      "password": ""
    })
  }

  ValidateUser() {
    if (this.UOTP === this.loginForm.value.password) {
      debugger;
      let objV = {
        "Username": this.loginForm.value.username,
        "Password": this.UOTP,
        "Latitude":sessionStorage.getItem("lat"),
        "Longitude": sessionStorage.getItem("lng")
      }
      console.log(objV)
      this.dbCallingService.MobileLogin(objV).subscribe(
        (resAuth) => {

          if (resAuth.ServiceResponse === 1) {
            let udata = resAuth.data[0];
            sessionStorage.setItem('UserId', udata.UserId.toString());
            sessionStorage.setItem('Role', String(udata.Role));
            sessionStorage.setItem('UserName', String(udata.Username));
            sessionStorage.setItem('Ward', String(udata.Ward));
            sessionStorage.setItem('ApkLink', String(udata.APKLink));
            this.router.navigateByUrl('/dashboard');
          }
          else {
            Swal.fire({
              text: resAuth.msg,
              icon: 'warning'
            });
          }
        },
        (err) => {
          Swal.fire({
            text: "Something went wrong!!",
            icon: 'warning'
          });
        })
    }
    else {
      Swal.fire({
        text: "Invalid OTP",
        icon: 'warning'
      });
    }
  }
}
