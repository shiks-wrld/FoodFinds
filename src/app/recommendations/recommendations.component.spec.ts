// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { RecommendationsComponent } from './recommendations.component';
// import { RecommendationService } from '../services/RecommendationService/recommendation.service';
// import { FormsModule } from '@angular/forms';
// import { MatChipsModule } from '@angular/material/chips';
// import { MatTabsModule } from '@angular/material/tabs';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatCardModule } from '@angular/material/card';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { Recommendation } from '../models/recommendation.model';

// describe('RecommendationsComponent', () => {
//   let component: RecommendationsComponent;
//   let fixture: ComponentFixture<RecommendationsComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [
//         RecommendationsComponent,
//         FormsModule,
//         MatCardModule,
//         MatChipsModule,
//         MatTabsModule,
//         BrowserAnimationsModule,
//         HttpClientTestingModule,
//         RouterTestingModule,
//       ],
//       providers: [RecommendationService],
//     }).compileComponents();

//     fixture = TestBed.createComponent(RecommendationsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should filter one recommendation based on search input', () => {
//     component.recommendationSearch = 'Italian';
//     const filteredRecs = component.filteredRecommendations();
//     expect(
//       filteredRecs.every((rec) =>
//         rec.cuisine.toLowerCase().includes('italian'),
//       ),
//     ).toBeTruthy();
//   });

//   it('should filter multiple recommendations based on search term', () => {
//     component.recommendationSearch = 'Italian';

//     const mockRecommendations = [
//       { cuisine: 'Italian', taste: 'Savory', mealType: 'Dinner' },
//       { cuisine: 'Mexican', taste: 'Spicy', mealType: 'Lunch' },
//     ];

//     component.rec = mockRecommendations as Recommendation[];

//     const filteredRecommendations = component.filteredRecommendations();
//     expect(filteredRecommendations.length).toEqual(1);
//     expect(filteredRecommendations[0].cuisine.toLowerCase()).toContain(
//       'italian',
//     );
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecommendationsComponent } from './recommendations.component';
import { RecommendationService } from '../services/RecommendationService/recommendation.service';
import { of, throwError } from 'rxjs';
import { Recommendation } from '../models/recommendation.model';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';

describe('RecommendationsComponent', () => {
  let component: RecommendationsComponent;
  let fixture: ComponentFixture<RecommendationsComponent>;
  let recommendationService: RecommendationService;

  const mockRecommendations: Recommendation[] = [
    {
      cuisine: 'Italian', taste: 'Savory', mealType: 'Lunch',
      recommendation: '',
      recommendationAddress: ''
    },
    {
      cuisine: 'Mexican', taste: 'Spicy', mealType: 'Dinner',
      recommendation: '',
      recommendationAddress: ''
    },
    {
      cuisine: 'Japanese', taste: 'Umami', mealType: 'Dinner',
      recommendation: '',
      recommendationAddress: ''
    },
  ];

  beforeEach(async () => {
    // Create a mock for the RecommendationService
    const recommendationServiceSpy = jasmine.createSpyObj('RecommendationService', ['retrieveRecommendations']);

    await TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatChipsModule,
        MatButtonModule,
        MatInputModule,
        FormsModule,
        MatIconModule,
        MatAutocompleteModule,
        MatTabsModule,
      ],
      declarations: [RecommendationsComponent],
      providers: [{ provide: RecommendationService, useValue: recommendationServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(RecommendationsComponent);
    component = fixture.componentInstance;
    recommendationService = TestBed.inject(RecommendationService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize recommendation options correctly', () => {
    expect(component.cuisinesOpts.length).toBeGreaterThan(0);
    expect(component.tasteOpts.length).toBeGreaterThan(0);
    expect(component.mealOpts.length).toBeGreaterThan(0);
  });

  it('should retrieve recommendations on initialization', () => {
    // Correct spy setup for retrieveRecommendations
    (recommendationService.retrieveRecommendations as jasmine.Spy).and.returnValue(of(mockRecommendations));

    component.ngOnInit();
    expect(component.rec).toEqual(mockRecommendations);
  });

  it('should handle an error when retrieving recommendations', () => {
    const consoleSpy = spyOn(console, 'log');
    (recommendationService.retrieveRecommendations as jasmine.Spy).and.returnValue(throwError(() => new Error('Service error')));

    component.ngOnInit();
    expect(consoleSpy).toHaveBeenCalledWith(new Error('Service error'));
    expect(component.rec).toEqual([]);
  });

  it('should filter recommendations based on the search input', () => {
    component.rec = mockRecommendations;
    component.recommendationSearch = 'Italian';

    const filtered = component.filteredRecommendations();
    expect(filtered.length).toBe(1);
    expect(filtered[0].cuisine).toBe('Italian');
  });

  it('should filter recommendations to include multiple matches', () => {
    component.rec = mockRecommendations;
    component.recommendationSearch = 'Dinner';

    const filtered = component.filteredRecommendations();
    expect(filtered.length).toBe(2);
    expect(filtered.some(rec => rec.cuisine === 'Mexican')).toBeTrue();
    expect(filtered.some(rec => rec.cuisine === 'Japanese')).toBeTrue();
  });

  it('should return all recommendations if search input is empty', () => {
    component.rec = mockRecommendations;
    component.recommendationSearch = '';

    const filtered = component.filteredRecommendations();
    expect(filtered.length).toBe(3);
    expect(filtered).toEqual(mockRecommendations);
  });
});
