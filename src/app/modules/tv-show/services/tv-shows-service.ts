import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { TGenresApiResponse } from '../../../shared/models/genres.model';
import {
  ApiResponse,
  MovieCredits,
  MovieTypes,
  MovieVideos,
  TTvShow,
  TTvShowDetails,
} from '../../../shared/models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class TvShowsService {
  private httpService = inject(HttpClient);

  private baseUrl = environment.tmdbBaseApiUrl;

  loadTvShows(type: MovieTypes): Observable<ApiResponse<TTvShow>> {
    return this.httpService.get<ApiResponse<TTvShow>>(
      `${this.baseUrl}/tv/${type}`
    );
  }

  getTvShowDetails(tvShowId: number): Observable<TTvShowDetails> {
    return this.httpService.get<TTvShowDetails>(
      `${this.baseUrl}/tv/${tvShowId}`
    );
  }

  getTvShowCredits(tvShowId: number): Observable<MovieCredits> {
    return this.httpService.get<MovieCredits>(
      `${this.baseUrl}/tv/${tvShowId}/credits`
    );
  }

  getTvShowVideos(tvShowId: number): Observable<MovieVideos> {
    return this.httpService.get<MovieVideos>(
      `${this.baseUrl}/tv/${tvShowId}/videos`
    );
  }

  getGenres(): Observable<TGenresApiResponse> {
    return this.httpService.get<TGenresApiResponse>(
      `${this.baseUrl}/genre/tv/list`
    );
  }
}
