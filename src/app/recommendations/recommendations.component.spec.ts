import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationsComponent } from './recommendations.component';
import { RecommendationService } from '../services/RecommendationService/recommendation.service';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Recommendation } from '../models/recommendation.model';

describe('RecommendationsComponent', () => {
  let component: RecommendationsComponent;
  let fixture: ComponentFixture<RecommendationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RecommendationsComponent,
        FormsModule,
        MatCardModule,
        MatChipsModule,
        MatTabsModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [RecommendationService],
    }).compileComponents();

    fixture = TestBed.createComponent(RecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter one recommendation based on search input', () => {
    component.recommendationSearch = 'Italian';
    const filteredRecs = component.filteredRecommendations();
    expect(
      filteredRecs.every((rec) =>
        rec.cuisine.toLowerCase().includes('italian'),
      ),
    ).toBeTruthy();
  });

  it('should filter multiple recommendations based on search term', () => {
    component.recommendationSearch = 'Italian';

    const mockRecommendations = [
      { cuisine: 'Italian', taste: 'Savory', mealType: 'Dinner' },
      { cuisine: 'Mexican', taste: 'Spicy', mealType: 'Lunch' },
    ];

    component.rec = mockRecommendations as Recommendation[];

    const filteredRecommendations = component.filteredRecommendations();
    expect(filteredRecommendations.length).toEqual(1);
    expect(filteredRecommendations[0].cuisine.toLowerCase()).toContain(
      'italian',
    );
  });
});
