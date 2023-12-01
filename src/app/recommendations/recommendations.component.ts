import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import {FormBuilder} from "@angular/forms";
import {ReviewService} from "../services/review.service";
import {FlexModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";

interface Options {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatChipsModule, FlexModule, MatButtonModule],
  templateUrl: './recommendations.component.html',
  styleUrl: './recommendations.component.css'
})
export class RecommendationsComponent implements OnInit {
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
      this.reviews.filter()
      console.log('Recommendation Form: ', this.reviews);
    });
  }
}
