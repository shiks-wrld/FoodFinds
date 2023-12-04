import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FlexModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import {FormBuilder, FormsModule} from "@angular/forms";
import {ReviewService} from "../services/ReviewService/review.service";
import {MatInputModule} from "@angular/material/input";
import {Options} from "../models/options.model";

@Component({
  selector: 'app-view-reviews',
  standalone: true,
  imports: [CommonModule, FlexModule, MatButtonModule, MatCardModule, MatChipsModule, MatInputModule, FormsModule],
  templateUrl: './view-reviews.component.html',
  styleUrl: './view-reviews.component.css'
})
export class ViewReviewsComponent implements OnInit {
  reviews: any;
  gridColumns = 3;

  cuisinesOpts: Options[] = [
    {value: 'Italian', viewValue: 'Italian'},
    {value: 'Mexican', viewValue: 'Mexican'},
    {value: 'Chinese', viewValue: 'Chinese'},
    {value: 'Indian', viewValue: 'Indian'},
    {value: 'American', viewValue: 'American'},
    {value: 'Fast-Food', viewValue: 'Fast Food'},
    {value: 'Japanese', viewValue: 'Japanese'},
    {value: 'Vegan', viewValue: 'Vegan'},
  ];

  constructor(private fb: FormBuilder, private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.reviewService.retrieveReviews().subscribe(data => {
      this.reviews = data;
      console.log('Recommendation Form: ', this.reviews);
    });
  }
}
