import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesDetailsPage } from './movies-details-page';

describe('MoviesDetailsPage', () => {
  let component: MoviesDetailsPage;
  let fixture: ComponentFixture<MoviesDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesDetailsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
