import { DatePipe, UpperCasePipe } from '@angular/common';
import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { finalize, Subject, takeUntil } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { TGenres } from '../../../../shared/models/genres.model';
import { TMovie } from '../../../../shared/models/movie.model';
import { MoviesService } from '../../services/movies-service';

@Component({
  selector: 'app-movies-top-rated-page',
  imports: [DatePipe, UpperCasePipe, RouterLink],
  templateUrl: './movies-top-rated-page.html',
})
export class MoviesTopRatedPage implements OnInit, OnDestroy {
  private movieService = inject(MoviesService);

  protected topratedMovies: WritableSignal<TMovie[]> = signal([]);
  protected genreMap: WritableSignal<TGenres[]> = signal([]);
  protected isLoading: WritableSignal<boolean> = signal(true);
  protected error: WritableSignal<string | null> = signal(null);
  protected posterImageUrl = environment.image.poster;

  private $ngUnsubscribe: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.movieService
      .loadMovies('top_rated')
      .pipe(
        takeUntil(this.$ngUnsubscribe),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: (response) => this.topratedMovies.set(response.results),
        error: (errorResponse) => {
          console.error('Failed to load top rated movies', errorResponse);
          this.error.set('Failed to load top rated movies');
        },
      });

    this.movieService
      .getGenres()
      .pipe(takeUntil(this.$ngUnsubscribe))
      .subscribe({
        next: (response) => this.genreMap.set(response.genres),
        error: (errorResponse) => {
          console.error('Failed to load genres', errorResponse);
          this.error.set('Failed to load genres');
        },
      });
  }

  ngOnDestroy(): void {
    this.$ngUnsubscribe.next();
    this.$ngUnsubscribe.complete();
  }

  getGenreName(id: number): string {
    const genre = this.genreMap().find((genre) => genre.id === id);
    return genre?.name ?? 'Unknown';
  }
}
