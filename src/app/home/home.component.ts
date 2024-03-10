import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GoogleMapsModule} from "@angular/google-maps";

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

    // Markers
    marker1 = {position: {lat: 42.504860, lng: -83.087900}, label: "Salvatore Scallopini"};
    marker2 = {position: {lat: 42.513430, lng: -83.105730}, label: "The Masters Restaurant"};
    marker3 = {position: {lat: 42.517270, lng: -83.086760}, label: "Phở Tài"};
    markers = [this.marker1, this.marker2, this.marker3];

    ngOnInit() {
      this.loadGoogleMapsScript(() => {
        navigator.geolocation.getCurrentPosition((position) => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
        });
      });
    }

  private loadGoogleMapsScript(callback: () => void): void {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBog1RYsYIC8i5LEozPlNQXWrL5Dp0_pPc&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = callback;
    document.body.appendChild(script);
  }
}
