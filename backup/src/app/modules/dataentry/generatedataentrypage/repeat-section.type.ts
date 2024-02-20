import { Component } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';

@Component({
  selector: 'formly-repeat-section',
  template: `
    <div style="background-color: #f39c12;">
      <h3>{{ to['addText']}}</h3>
    </div>
    <div
      *ngFor="let field of field.fieldGroup; let i = index"
      class="row"
      style="margin-left: 0px;"
    >
      <formly-field class="col" [field]="field"></formly-field>
    </div>
  `,
})
export class RepeatTypeComponent extends FieldArrayType {}
// <div style="margin:30px 0;">
//       <button class="btn btn-primary" type="button" (click)="add()">{{ to.addText }}</button>
//     </div>
// <div class="col-sm-2 d-flex align-items-center">
//         <button class="btn btn-danger" type="button" (click)="remove(i)">Remove</button>
//       </div>
