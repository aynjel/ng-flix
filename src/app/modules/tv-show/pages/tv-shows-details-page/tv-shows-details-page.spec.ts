import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvShowsDetailsPage } from './tv-shows-details-page';

describe('TvShowsDetailsPage', () => {
  let component: TvShowsDetailsPage;
  let fixture: ComponentFixture<TvShowsDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvShowsDetailsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvShowsDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
