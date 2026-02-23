import { Component, input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { capitalize } from 'lodash-es';

import { isCollectionNullOrEmpty, isPropertyNull } from '../../utils/isEmptyChecks.utils';

@Component({
  selector: 'storefront-form-field',
  imports: [],
  templateUrl: './form-field.html',
  styleUrl: './form-field.scss',
})
export class FormFieldComponent {
  form = input.required<FormGroup>();
  fieldName = input.required<string>();

  hasFieldErrors(): boolean {
    const field = this.form().get(this.fieldName());
    return (
      !isPropertyNull(field)
      && (field?.touched ?? false)
      && !isCollectionNullOrEmpty(field?.errors)
    );
  }

  getFieldError(): string | null {
      const field = this.form().get(this.fieldName());
      if (field && field.touched && field.errors) {
          if (field.errors['required']) {
              return `${capitalize(this.fieldName())} is required`;
          }
          if (field.errors['email']) {
              return 'Please enter a valid email address';
          }
          if (field.errors['maxlength']) {
              return `${capitalize(this.fieldName())} must be no more than ${field.errors['maxlength'].requiredLength} characters`;
          }
      }
      return null;
  }

}
