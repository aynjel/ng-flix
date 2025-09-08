import { Routes } from '@angular/router';
import { TvShowsDetailsPage } from './pages/tv-shows-details-page/tv-shows-details-page';
import { TvShowsPopularPage } from './pages/tv-shows-popular-page/tv-shows-popular-page';
import { TvShowsTopRatedPage } from './pages/tv-shows-top-rated-page/tv-shows-top-rated-page';

export const routes: Routes = [
  {
    path: '',
    component: TvShowsPopularPage,
    title: 'Popular TV Shows',
  },
  {
    path: 'details/:id',
    component: TvShowsDetailsPage,
    title: 'TV Show Details',
  },
  {
    path: 'top-rated',
    component: TvShowsTopRatedPage,
    title: 'Top Rated TV Shows',
  },
];
