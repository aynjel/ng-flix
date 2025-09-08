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
  TTvShowDetails,
  Video,
} from '../../../../shared/models/movie.model';
import { TvShowsService } from '../../services/tv-shows-service';

@Component({
  selector: 'app-tv-shows-details-page',
  imports: [
    DatePipe,
    CastCarouselComponent,
    VideosCarouselComponent,
    RouterLink,
  ],
  templateUrl: './tv-shows-details-page.html',
})
export class TvShowsDetailsPage implements OnInit, OnDestroy {
  private tvShowService = inject(TvShowsService);
  private route = inject(ActivatedRoute);

  protected tvShowDetails: WritableSignal<TTvShowDetails | null> = signal(null);
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
          this.loadTvShowsDetails(movieId);
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

  private loadTvShowsDetails(movieId: number): void {
    this.isLoading.set(true);
    this.error.set(null);

    // Load movie details
    this.tvShowService
      .getTvShowDetails(movieId)
      .pipe(takeUntil(this.$ngUnsubscribe))
      .subscribe({
        next: (movie) => this.tvShowDetails.set(movie),
        error: (errorResponse) => {
          console.error('Error loading movie details:', errorResponse);
          this.error.set('Failed to load movie details');
        },
      });

    // Load movie credits (cast and crew)
    this.tvShowService
      .getTvShowCredits(movieId)
      .pipe(takeUntil(this.$ngUnsubscribe))
      .subscribe({
        next: (credits) => this.movieCredits.set(credits),
        error: (errorResponse) => {
          console.error('Error loading movie credits:', errorResponse);
          // Don't set error for credits failure, just log it
        },
      });

    // Load movie videos (trailers, teasers, etc.)
    this.tvShowService
      .getTvShowVideos(movieId)
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
    // return videos.results.filter(
    //   (video) =>
    //     video.site === 'YouTube' &&
    //     (video.type === 'Trailer' || video.type === 'Teaser')
    // );
  }

  ngOnDestroy(): void {
    this.$ngUnsubscribe.next();
    this.$ngUnsubscribe.complete();
  }
}
