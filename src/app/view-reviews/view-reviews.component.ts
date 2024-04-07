import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { FormBuilder, FormsModule } from '@angular/forms';
import { ReviewService } from '../services/ReviewService/review.service';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Review } from '../models/review.model';

@Component({
  selector: 'app-view-reviews',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
  ],
  templateUrl: './view-reviews.component.html',
  styleUrl: './view-reviews.component.css',
})
export class ViewReviewsComponent implements OnInit {
  reviews: any;
  reviewSearch = '';
  rev: Review[] = [];

  constructor(
    private fb: FormBuilder,
    private reviewService: ReviewService,
  ) {}

  ngOnInit(): void {
    this.reviewService.retrieveReviews().subscribe((data) => {
      this.reviews = data;
      console.log('Recommendation Form: ', this.reviews);
      if (data === null) {
        this.rev = [];
      } else {
        this.rev = data as unknown as Review[];
      }
    });
  }

  filteredReviews(): Review[] {
    return this.rev.filter((r) =>
      r.cuisine.toLowerCase().includes(this.reviewSearch.toLowerCase()),
    );
  }
}
