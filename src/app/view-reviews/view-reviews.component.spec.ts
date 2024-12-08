import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ViewReviewsComponent } from './view-reviews.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReviewService } from '../services/ReviewService/review.service';
import { of } from 'rxjs';

describe('ViewReviewsComponent', () => {
  let component: ViewReviewsComponent;
  let fixture: ComponentFixture<ViewReviewsComponent>;

  beforeEach(waitForAsync(() => {
    const mockReviewService = jasmine.createSpyObj('ReviewService', [
      'retrieveReviews',
    ]);
    const dummyReviews = [
      {
        cuisine: 'Italian',
        locationName: 'Restaurant 1',
        address: 'Address 1',
        rating: 4,
        foodQuality: 'Good',
        comments: 'Nice place',
      },
      {
        cuisine: 'Chinese',
        locationName: 'Restaurant 2',
        address: 'Address 2',
        rating: 3,
        foodQuality: 'Average',
        comments: 'Okay experience',
      },
    ];

    mockReviewService.retrieveReviews.and.returnValue(of(dummyReviews));

    TestBed.configureTestingModule({
      imports: [
        ViewReviewsComponent,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [{ provide: ReviewService, useValue: mockReviewService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // -- COMMENTED OUT OLD TEST CASES --
  // it('should filter reviews based on search criteria', () => {
  //   component.rev = [
  //     {
  //       cuisine: 'Italian',
  //       locationName: 'Restaurant 1',
  //       address: 'Address 1',
  //       rating: 4,
  //       foodQuality: 'Good',
  //       comments: 'Nice place',
  //     },
  //     {
  //       cuisine: 'Chinese',
  //       locationName: 'Restaurant 2',
  //       address: 'Address 2',
  //       rating: 3,
  //       foodQuality: 'Average',
  //       comments: 'Okay experience',
  //     },
  //     {
  //       cuisine: 'Indian',
  //       locationName: 'Restaurant 3',
  //       address: 'Address 3',
  //       rating: 5,
  //       foodQuality: 'Excellent',
  //       comments: 'Highly recommended',
  //     },
  //   ];
  //   component.reviewSearch = 'italian';
  //
  //   const filteredResults = component.filteredReviews();
  //
  //   expect(filteredResults.length).toBe(1);
  //   expect(filteredResults[0].cuisine.toLowerCase()).toContain('italian');
  // });
  //
  // it('should fetch and update reviews from the service', () => {
  //   const dummyReviews = [
  //     {
  //       cuisine: 'Italian',
  //       locationName: 'Restaurant 1',
  //       address: 'Address 1',
  //       rating: 4,
  //       foodQuality: 'Good',
  //       comments: 'Nice place',
  //     },
  //     {
  //       cuisine: 'Chinese',
  //       locationName: 'Restaurant 2',
  //       address: 'Address 2',
  //       rating: 3,
  //       foodQuality: 'Average',
  //       comments: 'Okay experience',
  //     },
  //   ];
  //
  //   TestBed.inject(ReviewService).retrieveReviews();
  //
  //   component.ngOnInit();
  //   expect(component.rev).toEqual(dummyReviews);
  // });
});
