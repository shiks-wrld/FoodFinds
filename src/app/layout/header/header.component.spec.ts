import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        FormsModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize openedVal to false', () => {
    expect(component.openedVal).toBe(false);
  });

  it('should toggle openedVal on button click', () => {
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(component.openedVal).toBe(true);

    button.click();
    expect(component.openedVal).toBe(false);
  });

  it('should have a router link to "/review"', () => {
    const link = fixture.nativeElement.querySelector('a[routerLink="review"]');
    expect(link).toBeTruthy();
  });

  it('should have a router link to "/view-reviews"', () => {
    const link = fixture.nativeElement.querySelector(
      'a[routerLink="view-reviews"]',
    );
    expect(link).toBeTruthy();
  });

  it('should have a router link to "/recommendations"', () => {
    const link = fixture.nativeElement.querySelector(
      'a[routerLink="recommendations"]',
    );
    expect(link).toBeTruthy();
  });
});
