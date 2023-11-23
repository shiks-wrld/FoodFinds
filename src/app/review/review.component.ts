import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";

interface Options {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent implements OnInit {
  reviewForm: FormGroup;
  cuisines: Options[] = [
    {value: 'italian-0', viewValue: 'Italian'},
    {value: 'mexican-1', viewValue: 'Mexican'},
    {value: 'chinese-2', viewValue: 'Chinese'},
    {value: 'indian-3', viewValue: 'Indian'},
    {value: 'american-4', viewValue: 'American'},
    {value: 'fastfood-5', viewValue: 'Fast Food'},
    {value: 'japanese-6', viewValue: 'Japanese'},
    {value: 'vegan-7', viewValue: 'Vegan'},
  ];

  quality: Options[] = [
    {value: 'amazing-0', viewValue: 'Amazing!!'},
    {value: 'good-1', viewValue: 'Good'},
    {value: 'alright-2', viewValue: 'Alright'},
    {value: 'bad-3', viewValue: 'Bad'},
    {value: 'avoid-4', viewValue: 'Avoid at all costs!!'}
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.reviewForm = this.fb.group({
      address: ['', Validators.required],
      locationName: ['', Validators.required],
      cuisine: ['', Validators.required],
      rating: [1, Validators.required],
      foodQuality: ['', Validators.required],
      comments: ['', Validators.required]
    });
  }

  onSubmit(form: FormGroup) {
    console.log('Review Form: ', this.reviewForm);
  }
}
