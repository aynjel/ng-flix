import { Routes } from '@angular/router';
import { MoviesDetailsPage } from './pages/movies-details-page/movies-details-page';
import { MoviesPopularPage } from './pages/movies-popular-page/movies-popular-page';
import { MoviesTopRatedPage } from './pages/movies-top-rated-page/movies-top-rated-page';

export const routes: Routes = [
  {
    path: '',
    component: MoviesPopularPage,
    title: 'Popular Movies',
  },
  {
    path: 'details/:id',
    component: MoviesDetailsPage,
    title: 'Movie Details',
  },
  {
    path: 'top-rated',
    component: MoviesTopRatedPage,
    title: 'Top Rated Movies',
  },
];
