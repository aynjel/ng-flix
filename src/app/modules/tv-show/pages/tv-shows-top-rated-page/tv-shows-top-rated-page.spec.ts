import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvShowsTopRatedPage } from './tv-shows-top-rated-page';

describe('TvShowsTopRatedPage', () => {
  let component: TvShowsTopRatedPage;
  let fixture: ComponentFixture<TvShowsTopRatedPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvShowsTopRatedPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvShowsTopRatedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
