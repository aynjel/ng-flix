import { DatePipe } from '@angular/common';
import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { finalize, Subject, takeUntil } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { CastCarouselComponent } from '../../../../shared/components/cast-carousel/cast-carousel';
import { VideosCarouselComponent } from '../../../../shared/components/videos-carousel/videos-carousel';
import {
  Cast,
  MovieCredits,
  MovieVideos,
  TMovieDetails,
  Video,
} from '../../../../shared/models/movie.model';
import { MoviesService } from '../../services/movies-service';

@Component({
  selector: 'app-movies-details-page',
  imports: [
    RouterLink,
    DatePipe,
    CastCarouselComponent,
    VideosCarouselComponent,
  ],
  templateUrl: './movies-details-page.html',
})
export class MoviesDetailsPage implements OnInit, OnDestroy {
  private movieService = inject(MoviesService);
  private route = inject(ActivatedRoute);

  protected movieDetails: WritableSignal<TMovieDetails | null> = signal(null);
  protected movieCredits: WritableSignal<MovieCredits | null> = signal(null);
  protected movieVideos: WritableSignal<MovieVideos | null> = signal(null);
  protected isLoading: WritableSignal<boolean> = signal(true);
  protected error: WritableSignal<string | null> = signal(null);
  protected baseImageUrl = environment.image.base;
  protected posterImageUrl = environment.image.poster;
  protected profileImageUrl = environment.image.profile;

  private $ngUnsubscribe: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.$ngUnsubscribe)).subscribe({
      next: (params) => {
        const movieId = +params['id'];
        if (movieId) {
          this.loadMovieDetails(movieId);
        } else {
          this.error.set('Invalid movie ID');
          this.isLoading.set(false);
        }
      },
      error: (error) => {
        this.error.set('Failed to get movie ID from route');
        this.isLoading.set(false);
      },
    });
  }

  private loadMovieDetails(movieId: number): void {
    this.isLoading.set(true);
    this.error.set(null);

    // Load movie details
    this.movieService
      .getMovieDetails(movieId)
      .pipe(takeUntil(this.$ngUnsubscribe))
      .subscribe({
        next: (movie) => this.movieDetails.set(movie),
        error: (errorResponse) => {
          console.error('Error loading movie details:', errorResponse);
          this.error.set('Failed to load movie details');
        },
      });

    // Load movie credits (cast and crew)
    this.movieService
      .getMovieCredits(movieId)
      .pipe(takeUntil(this.$ngUnsubscribe))
      .subscribe({
        next: (credits) => this.movieCredits.set(credits),
        error: (errorResponse) => {
          console.error('Error loading movie credits:', errorResponse);
          // Don't set error for credits failure, just log it
        },
      });

    // Load movie videos (trailers, teasers, etc.)
    this.movieService
      .getMovieVideos(movieId)
      .pipe(
        takeUntil(this.$ngUnsubscribe),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: (videos) => this.movieVideos.set(videos),
        error: (errorResponse) => {
          console.error('Error loading movie videos:', errorResponse);
          // Don't set error for videos failure, just log it
        },
      });
  }

  protected formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  protected formatRuntime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  }

  protected getTopCast(limit: number = 10): Cast[] {
    const credits = this.movieCredits();
    if (!credits || !credits.cast) {
      return [];
    }
    return credits.cast.slice(0, limit);
  }

  protected getTrailers(): Video[] {
    const videos = this.movieVideos();
    if (!videos || !videos.results) {
      return [];
    }
    return videos.results;
  }

  ngOnDestroy(): void {
    this.$ngUnsubscribe.next();
    this.$ngUnsubscribe.complete();
  }

  onBackClick(): void {
    window.history.back();
  }
}
