import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesTopRatedPage } from './movies-top-rated-page';

describe('MoviesTopRatedPage', () => {
  let component: MoviesTopRatedPage;
  let fixture: ComponentFixture<MoviesTopRatedPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesTopRatedPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesTopRatedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
