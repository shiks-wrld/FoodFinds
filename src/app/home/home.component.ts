import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GoogleMapsModule} from "@angular/google-maps";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  mapOptions: google.maps.MapOptions = {
    center: { lat: 42.321510, lng: -83.232338 },
    zoom : 14
  }

  marker = {
    position: { lat: 42.321510, lng: -83.232338 },
    title: 'Hello World!'
  }

  stores = [
    {
      name: 'Store 1',
      location: {lat: 40.785091, lng: -73.968285},
      hours: '8AM to 10PM'
    },
    {
      name: 'Store 2',
      location: {lat: 40.790091, lng: -73.968285},
      hours: '9AM to 9PM'
    }
  ];
}
