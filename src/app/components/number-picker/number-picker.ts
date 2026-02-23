import { Component, effect, OnInit, output, signal } from '@angular/core';
import { MaterialIconComponent } from "../material-icon/material-icon";

@Component({
  selector: 'storefront-number-picker',
  imports: [MaterialIconComponent],
  templateUrl: './number-picker.html',
  styleUrl: './number-picker.scss',
})
export class NumberPickerComponent implements OnInit {
  change = output<number>();

  counter = signal<number>(1);

  constructor() {
    effect(() => this.change.emit(this.counter()));
  }

  ngOnInit(): void {
    this.change.emit(1);
  }

  increment() { this.counter.update(c => c += 1); }

  decrement() {
    if (this.counter() === 1) return;

    this.counter.update(c => c -= 1);
  }
}
