import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ReviewComponent} from "./review/review.component";
import {RecommendationsComponent} from "./recommendations/recommendations.component";

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "review",
    component: ReviewComponent,
  },
  {
    path: "recommendations",
    component: RecommendationsComponent,
  }
];
