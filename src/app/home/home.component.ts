import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';

interface Marker {
  position: google.maps.LatLngLiteral;
  label: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  zoom = 12;
  center: google.maps.LatLngLiteral;
  markers: Marker[] = [];

  private initializeMap(): void {
    this.markers = [
      {
        position: { lat: 42.50486, lng: -83.0879 },
        label: 'Salvatore Scallopini',
      },
      {
        position: { lat: 42.51343, lng: -83.10573 },
        label: 'The Masters Restaurant',
      },
      { position: { lat: 42.51727, lng: -83.08676 }, label: 'Phở Tài' },
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
      },
    );
  }

  ngOnInit() {
    this.getCurrentLocation();
    this.initializeMap();
  }
}
