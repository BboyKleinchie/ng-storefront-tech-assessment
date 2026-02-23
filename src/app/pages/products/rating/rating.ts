import { Component, input } from '@angular/core';
import { Rating } from '../../../models/rating.model';

@Component({
  selector: 'storefront-rating',
  imports: [],
  templateUrl: './rating.html',
  styleUrl: './rating.scss',
})
export class RatingComponent {
  rating = input.required<Rating>();
}
