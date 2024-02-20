import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-horizontal-wrapper',
  template: `
    <c-row class="mb-3">
      <label cLabel class="col-sm-2" [attr.for]="id" *ngIf="to.label">
        {{ to.label }}
        <!-- <ng-container
          *ngIf="to['required'] && to['hideRequiredMarker'] !== true"
          >*</ng-container
        > -->
      </label>
      <!-- <c-col [sm]="8">
        <ng-template #fieldComponent></ng-template>
      </c-col> -->

      <!-- <div
        *ngIf="showError"
        class="col-sm-3 col-form-label invalid-feedback d-block"
      >
        <formly-validation-message [field]="field"></formly-validation-message>
      </div> -->
    </c-row>
  `,
})
export class FormlyHorizontalWrapper extends FieldWrapper {}
