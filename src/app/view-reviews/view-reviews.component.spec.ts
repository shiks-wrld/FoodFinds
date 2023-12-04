import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReviewsComponent } from './view-reviews.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ViewReviewsComponent', () => {
  let component: ViewReviewsComponent;
  let fixture: ComponentFixture<ViewReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewReviewsComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
