import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Review } from '../../models/review.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private readonly baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:8080/reviews';
  }

  public submitReviews(review: Review) {
    return this.http.post<Review>(this.baseUrl, review);
  }

  public retrieveReviews() {
    return this.http.get<Review>(this.baseUrl);
  }
}
