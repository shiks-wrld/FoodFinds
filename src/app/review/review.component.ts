import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {ReviewService} from "../services/review.service";
import {HttpClientModule} from "@angular/common/http";

interface Options {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule, HttpClientModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent implements OnInit {
  reviewForm: FormGroup;
  cuisines: Options[] = [
    {value: 'Italian', viewValue: 'Italian'},
    {value: 'Mexican', viewValue: 'Mexican'},
    {value: 'Chinese', viewValue: 'Chinese'},
    {value: 'Indian', viewValue: 'Indian'},
    {value: 'American', viewValue: 'American'},
    {value: 'Fast-Food', viewValue: 'Fast Food'},
    {value: 'Japanese', viewValue: 'Japanese'},
    {value: 'Vegan', viewValue: 'Vegan'},
  ];

  quality: Options[] = [
    {value: 'Amazing', viewValue: 'Amazing!!'},
    {value: 'Good', viewValue: 'Good'},
    {value: 'Alright', viewValue: 'Alright'},
    {value: 'Bad', viewValue: 'Bad'},
    {value: 'Avoid', viewValue: 'Avoid at all costs!!'}
  ];

  @Input() maxRating = 5;
  maxRatingArr: any = [];

  @Input() selectedStar: number = 0;
  previousSelectedStar = 0;

  @Output()
  onRating: EventEmitter<number> = new EventEmitter<number>()

  constructor(private fb: FormBuilder, private reviewService: ReviewService) {
  }

  ngOnInit() {
    this.reviewForm = this.fb.group({
      address: ['', Validators.required],
      locationName: ['', Validators.required],
      cuisine: ['', Validators.required],
      rating: [0, Validators.required],
      foodQuality: ['', Validators.required],
      comments: ['', Validators.required]
    });

    this.maxRatingArr = Array(this.maxRating).fill(0);
  }

  handleMouseEnter(index: number) {
    this.selectedStar = index + 1;
  }

  handleMouseLeave() {
    if (this.previousSelectedStar !== 0) {
      this.selectedStar = this.previousSelectedStar;
    } else {
      this.selectedStar = 0;
    }
  }

  rating(index: number) {
    this.selectedStar = index + 1;
    this.previousSelectedStar = this.selectedStar;
    this.onRating.emit(this.selectedStar + 1);
  }

  onSubmit(form: FormGroup) {
    this.reviewForm.controls['rating'].setValue(this.selectedStar);
    this.reviewService.submitReviews(this.reviewForm.value).subscribe(data => {
      console.log('Review Form: ', this.reviewForm);
    });
  }
}
