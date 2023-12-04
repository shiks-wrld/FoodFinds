import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FlexModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import {FormBuilder, FormsModule} from "@angular/forms";
import {ReviewService} from "../services/ReviewService/review.service";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-view-reviews',
  standalone: true,
  imports: [CommonModule, FlexModule, MatButtonModule, MatCardModule, MatChipsModule, MatInputModule, FormsModule, MatIconModule],
  templateUrl: './view-reviews.component.html',
  styleUrl: './view-reviews.component.css'
})
export class ViewReviewsComponent implements OnInit {
  reviews: any;
  gridColumns = 3;

  constructor(private fb: FormBuilder, private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.reviewService.retrieveReviews().subscribe(data => {
      this.reviews = data;
      console.log('Recommendation Form: ', this.reviews);
    });
  }
}
