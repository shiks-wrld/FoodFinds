import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { RecommendationService } from '../services/RecommendationService/recommendation.service';
import { Recommendation } from '../models/recommendation.model';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Options } from '../models/options.model';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    FlexModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatTabsModule,
  ],
  templateUrl: './recommendations.component.html',
  styleUrl: './recommendations.component.css',
})
export class RecommendationsComponent implements OnInit {
  recommendationSearch = '';
  rec: Recommendation[] = [];
  gridColumns = 4;

  cuisinesOpts: Options[] = [
    { value: 'Italian', viewValue: 'Italian' },
    { value: 'Mexican', viewValue: 'Mexican' },
    { value: 'Chinese', viewValue: 'Chinese' },
    { value: 'Indian', viewValue: 'Indian' },
    { value: 'American', viewValue: 'American' },
    { value: 'Fast-Food', viewValue: 'Fast Food' },
    { value: 'Japanese', viewValue: 'Japanese' },
    { value: 'Vegan', viewValue: 'Vegan' },
    { value: 'Thai', viewValue: 'Thai' },
    { value: 'Vietnamese', viewValue: 'Vietnamese' },
    { value: 'African', viewValue: 'African' },
  ];

  tasteOpts: Options[] = [
    { value: 'Sweet', viewValue: 'Sweet' },
    { value: 'Spicy', viewValue: 'Spicy' },
    { value: 'Savory', viewValue: 'Savory' },
    { value: 'Cold', viewValue: 'Cold' },
    { value: 'Hot', viewValue: 'Hot' },
    { value: 'Bitter', viewValue: 'Bitter' },
    { value: 'Umami', viewValue: 'Umami' },
    { value: 'Salty', viewValue: 'Salty' },
  ];

  mealOpts: Options[] = [
    { value: 'Breakfast', viewValue: 'Breakfast' },
    { value: 'Lunch', viewValue: 'Lunch' },
    { value: 'Dinner', viewValue: 'Dinner' },
  ];

  constructor(private recommendationService: RecommendationService) {}

  ngOnInit(): void {
    this.recommendationService.retrieveRecommendations().subscribe({
      next: (resp) => {
        if (resp === null) {
          this.rec = [];
        } else {
          this.rec = resp as unknown as Recommendation[];
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  filteredRecommendations(): Recommendation[] {
    return this.rec.filter(
      (r) =>
        r.cuisine
          .toLowerCase()
          .includes(this.recommendationSearch.toLowerCase()) ||
        r.taste
          .toLowerCase()
          .includes(this.recommendationSearch.toLowerCase()) ||
        r.mealType
          .toLowerCase()
          .includes(this.recommendationSearch.toLowerCase()),
    );
  }
}
