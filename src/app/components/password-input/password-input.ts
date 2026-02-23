import { Component, output, signal, ViewEncapsulation } from '@angular/core';

import { MaterialIconComponent } from '../material-icon/material-icon';

@Component({
  selector: 'storefront-password-input',
  imports: [
    MaterialIconComponent
  ],
  templateUrl: './password-input.html',
  styleUrl: './password-input.scss',
  encapsulation: ViewEncapsulation.None
})
export class PasswordInputComponent {
  visibilityChange = output<boolean>();

  isPasswordVisible = signal<boolean>(false);

  togglePasswordVisibility(event: any) {
    event?.preventDefault();
    this.isPasswordVisible.set(!this.isPasswordVisible());
    this.visibilityChange.emit(this.isPasswordVisible());
  }
}
