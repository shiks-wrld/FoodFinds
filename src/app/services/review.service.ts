import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ReviewModel} from "../models/review.model";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private readonly baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = "http://localhost:8080/reviews";
  }

  public submitReviews(review: ReviewModel) {
    return this.http.post<ReviewModel>(this.baseUrl, review);
  }

  public retrieveReviews() {
    return this.http.get<ReviewModel>(this.baseUrl);
  }
}
