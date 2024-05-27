import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocationService } from 'src/app/core/services/location.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent {
  form: FormGroup;
  customStylesValidated = false;

  constructor(
    private _fb: FormBuilder,
    private http: HttpClient,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      workCode: [''],
      locationName: [''],
      // description: [''],
      // contractorName: ['', Validators.required],
      // length: ['', Validators.required],
      // lengthUnit: [''],
      // width: [''],
      // widthUnit: [''],
      // dlpPeriod: [''],
      // startDate: ['', Validators.required],
      // endDate: ['', Validators.required],
      // wardName: ['', Validators.required],
      // zoneName: ['', Validators.required],
      // coordinates: [''],
      // status: [''],
      // roadType: [''],
      // remarks: [''],
    });
  }

  onSubmit() {
    let form = {
      key: '9D18CSVC2',
      txnid: this.form.value.locationName,
      amount: this.form.value.workCode,
      email: 'nakadesneha@gmail.com',
      phone: '7020325511',
      firstname: 'Sneha Nakade',
      udf1: '',
      udf2: '',
      udf3: '',
      udf4: '',
      udf5: '',
      hash: this.generateHash(),
      productinfo: 'C&D',
      udf6: '',
      udf7: '',
      udf8: '',
      udf9: '',
      udf10: '',
      furl: 'http://localhost:3000/response', //'http://localhost:3000/response',
      surl: 'http://localhost:3000/response', //'http://localhost:3000/response'
      // unique_id:'unique_id',
      // split_payments:'split_payments',
      // sub_merchant_id:'sub_merchant_id',
      // customer_authentication_id:'customer_authentication_id' 
    };

    debugger;
    const paymentUrl = 'https://testpay.easebuzz.in/';
    const callUrl = paymentUrl + 'payment/initiateLink';
    this.locationService.call(callUrl, form).subscribe(
      (response) => {
        debugger;
        console.log("in call func : ",response);
        this.pay(response.data, paymentUrl);
      },
      (error) => {
        console.error('Error occurred:', error);
      }
    );
  }

  pay(data: any, paymentUrl: string) {
    // Your payment processing logic here
    console.log('Processing payment with:', data, paymentUrl);
  }

  generateHash() {
    var hashstring =
      '9D18CSVC2' +
      '|' +
      this.form.value.locationName +
      '|' +
      this.form.value.workCode +
      '|' +
      'C&D' +
      '|' +
      'Sneha Nakade' +
      '|' +
      'nakadesneha@gmail.com' +
      '|' +
      '' +
      '|' +
      '' +
      '|' +
      '' +
      '|' +
      '' +
      '|' +
      '' +
      '|' +
      '' +
      '|' +
      '' +
      '|' +
      '' +
      '|' +
      '' +
      '|' +
      '';
    hashstring += '|' + '1Z5QQFJ3B';
    const hash = CryptoJS.SHA512(hashstring).toString(CryptoJS.enc.Hex);
    debugger;
    return hash;
  }
}
