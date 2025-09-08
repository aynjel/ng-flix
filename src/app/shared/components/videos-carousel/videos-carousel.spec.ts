import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';

import { VideosCarouselComponent } from './videos-carousel';

describe('VideosCarouselComponent', () => {
  let component: VideosCarouselComponent;
  let fixture: ComponentFixture<VideosCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideosCarouselComponent],
      providers: [DomSanitizer],
    }).compileComponents();

    fixture = TestBed.createComponent(VideosCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
