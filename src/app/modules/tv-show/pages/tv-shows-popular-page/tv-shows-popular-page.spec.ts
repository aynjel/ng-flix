import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvShowsPopularPage } from './tv-shows-popular-page';

describe('TvShowsPopularPage', () => {
  let component: TvShowsPopularPage;
  let fixture: ComponentFixture<TvShowsPopularPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvShowsPopularPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvShowsPopularPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
