import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Recommendation} from "../../models/recommendation.model";

@Injectable({
    providedIn: 'root'
})
export class RecommendationService {
    private readonly baseUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = "http://localhost:8080/recommendation";
    }

    public retrieveRecommendations() {
        return this.http.get<Recommendation>(this.baseUrl);
    }
}
