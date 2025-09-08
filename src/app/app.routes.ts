import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'movies',
    loadChildren: () =>
      import('./modules/movie/movie.routes').then((m) => m.routes),
  },
  {
    path: 'tv-shows',
    loadChildren: () =>
      import('./modules/tv-show/tv-show.routes').then((m) => m.routes),
  },
  {
    path: 'genres',
    loadChildren: () =>
      import('./modules/genre/genre.routes').then((m) => m.routes),
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
