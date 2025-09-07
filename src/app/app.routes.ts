import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'movies',
    loadComponent: () =>
      import('./pages/movies-list/movies-list').then((m) => m.MoviesList),
  },
  {
    path: 'movies/:id',
    loadComponent: () =>
      import('./pages/movies-details/movies-details').then(
        (m) => m.MoviesDetails
      ),
  },
  {
    path: 'tv-shows',
    loadComponent: () =>
      import('./pages/tv-shows-list/tv-shows-list').then((m) => m.TvShowsList),
  },
  {
    path: 'genres',
    loadComponent: () => import('./pages/genres/genres').then((m) => m.Genres),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'movies',
  },
  {
    path: '**',
    redirectTo: 'movies',
  },
];
