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
import { TTvShow } from '../../../../shared/models/movie.model';
import { TvShowsService } from '../../services/tv-shows-service';

@Component({
  selector: 'app-tv-shows-top-rated-page',
  imports: [DatePipe, UpperCasePipe, RouterLink],
  templateUrl: './tv-shows-top-rated-page.html',
})
export class TvShowsTopRatedPage implements OnInit, OnDestroy {
  private tvShowsService = inject(TvShowsService);

  protected topratedTvShows: WritableSignal<TTvShow[]> = signal([]);
  protected genreMap: WritableSignal<TGenres[]> = signal([]);
  protected isLoading: WritableSignal<boolean> = signal(true);
  protected error: WritableSignal<string | null> = signal(null);
  protected posterImageUrl = environment.image.poster;

  private $ngUnsubscribe: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.tvShowsService
      .loadTvShows('top_rated')
      .pipe(
        takeUntil(this.$ngUnsubscribe),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: (response) => this.topratedTvShows.set(response.results),
        error: (errorResponse) => {
          console.error('Failed to load top rated movies', errorResponse);
          this.error.set('Failed to load top rated movies');
        },
      });

    this.tvShowsService
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
