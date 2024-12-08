
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewComponent } from './review.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ReviewService } from '../services/ReviewService/review.service';
import { Options } from '../models/options.model';

describe('ReviewComponent', () => {
  let component: ReviewComponent;
  let fixture: ComponentFixture<ReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewComponent],
      imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        HttpClientModule,
        MatProgressBarModule,
      ],
      providers: [ReviewService, MatSnackBar, Router],
    });

    fixture = TestBed.createComponent(ReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize reviewForm with required fields', () => {
    expect(component.reviewForm).toBeDefined();
    expect(component.reviewForm.controls['address'].valid).toBeFalsy();
    expect(component.reviewForm.controls['locationName'].valid).toBeFalsy();
    expect(component.reviewForm.controls['cuisine'].valid).toBeFalsy();
    expect(component.reviewForm.controls['rating'].valid).toBeFalsy();
    expect(component.reviewForm.controls['foodQuality'].valid).toBeFalsy();
    expect(component.reviewForm.controls['comments'].valid).toBeFalsy();
  });

  it('should handle mouse enter event', () => {
    component.handleMouseEnter(1);
    expect(component.selectedStar).toBe(2);
  });

  it('should handle mouse leave event', () => {
    component.handleMouseEnter(3);
    component.handleMouseLeave();
    expect(component.selectedStar).toBe(3);
  });

  it('should emit rating on click'), () => {
    spyOn(component.onRating, 'emit')}});