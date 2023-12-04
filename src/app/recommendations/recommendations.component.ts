import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import {FlexModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {RecommendationService} from "../services/RecommendationService/recommendation.service";
import {Recommendation} from "../models/recommendation.model";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatChipsModule, FlexModule, MatButtonModule, MatInputModule, FormsModule],
  templateUrl: './recommendations.component.html',
  styleUrl: './recommendations.component.css'
})
export class RecommendationsComponent implements OnInit {
  recommendationSearch = "";
  rec: Recommendation[] = [];

  constructor(private recommendationService: RecommendationService) {
  }

  ngOnInit(): void {
    this.recommendationService.retrieveRecommendations().subscribe(
        {
          next: (resp) => {
            if(resp === null) {
              this.rec = [];
            }
            else {
              this.rec = resp as unknown as Recommendation[];
            }
          },
          error: (err) => {
            console.log(err);
          }
        },
    );
  }

  filteredRecommendations(): Recommendation[] {
    return this.rec.filter((r) => r.cuisine.toLowerCase().includes(this.recommendationSearch.toLowerCase()));
  }
}
