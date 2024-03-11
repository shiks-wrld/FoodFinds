import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';

// Mock the Google namespace
const google = {
  maps: {
    LatLngLiteral: class LatLngLiteral {},
  },
};

xit('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, CommonModule, GoogleMapsModule], // Corrected imports here
      providers: [{ provide: 'google', useValue: google }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have a default zoom value of 12', () => {
    expect(component.zoom).toBe(12);
  });

  it('should initialize markers', () => {
    const expectedMarkers = [
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

    expect(component.markers).toEqual(expectedMarkers);
  });
});
