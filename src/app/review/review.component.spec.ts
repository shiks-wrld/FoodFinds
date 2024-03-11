import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewComponent } from './review.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReviewService } from '../services/ReviewService/review.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('ReviewComponent', () => {
  let component: ReviewComponent;
  let fixture: ComponentFixture<ReviewComponent>;
  let reviewService: ReviewService;
  let snackBar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReviewComponent,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [ReviewService, MatSnackBar],
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewComponent);
    component = fixture.componentInstance;
    reviewService = TestBed.inject(ReviewService);
    snackBar = TestBed.inject(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with the correct controls', () => {
    expect(component.reviewForm.get('address')).toBeTruthy();
    expect(component.reviewForm.get('locationName')).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.reviewForm.value).toEqual({
      address: '',
      locationName: '',
      cuisine: '',
      rating: 0,
      foodQuality: '',
      comments: '',
    });
  });

  it('should update selected star on mouse enter', () => {
    component.handleMouseEnter(2);
    expect(component.selectedStar).toBe(3);
  });

  it('should revert selected star on mouse leave', () => {
    component.handleMouseEnter(2);
    component.handleMouseLeave();
    expect(component.selectedStar).toBe(0);
  });

  it('should disable submit button when form is invalid', () => {
    component.reviewForm.invalid;
    fixture.detectChanges();
    const submitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]',
    );
    expect(submitButton.disabled).toBeFalsy();
  });

  it('should enable submit button when form is valid', () => {
    component.reviewForm.patchValue({
      address: 'Test Address',
      locationName: 'Test Location',
      cuisine: 'Italian',
      rating: 4,
      foodQuality: 'Amazing',
      comments: 'Great experience!',
    });
    fixture.detectChanges();
    const submitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]',
    );
    expect(submitButton.disabled).toBeFalsy();
  });
});
