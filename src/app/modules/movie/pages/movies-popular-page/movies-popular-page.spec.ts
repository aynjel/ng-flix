import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesPopularPage } from './movies-popular-page';

describe('MoviesPopularPage', () => {
  let component: MoviesPopularPage;
  let fixture: ComponentFixture<MoviesPopularPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesPopularPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesPopularPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
