import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GoogleMapsModule} from "@angular/google-maps";

interface Marker {
  position: google.maps.LatLngLiteral;
  label: string;
}

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, GoogleMapsModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  zoom = 12;
  center: google.maps.LatLngLiteral;
  markers: Marker[] = [];

  private initializeMap(): void {
    this.markers = [
      { position: { lat: 42.504860, lng: -83.087900 }, label: "Salvatore Scallopini" },
      { position: { lat: 42.513430, lng: -83.105730 }, label: "The Masters Restaurant" },
      { position: { lat: 42.517270, lng: -83.086760 }, label: "Phở Tài" }
    ];
  }

  private getCurrentLocation(): void {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      },
      (error) => {
        console.error('Error getting current location:', error);
      }
    );
  }

  ngOnInit() {
    this.getCurrentLocation();
    this.initializeMap();
  }
}
