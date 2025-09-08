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
  TMovie,
  TMovieDetails,
} from '../../../shared/models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private httpService = inject(HttpClient);

  private baseUrl = environment.tmdbBaseApiUrl;

  loadMovies(type: MovieTypes): Observable<ApiResponse<TMovie>> {
    return this.httpService.get<ApiResponse<TMovie>>(
      `${this.baseUrl}/movie/${type}`
    );
  }

  getMovieDetails(movieId: number): Observable<TMovieDetails> {
    return this.httpService.get<TMovieDetails>(
      `${this.baseUrl}/movie/${movieId}`
    );
  }

  getMovieCredits(movieId: number): Observable<MovieCredits> {
    return this.httpService.get<MovieCredits>(
      `${this.baseUrl}/movie/${movieId}/credits`
    );
  }

  getMovieVideos(movieId: number): Observable<MovieVideos> {
    return this.httpService.get<MovieVideos>(
      `${this.baseUrl}/movie/${movieId}/videos`
    );
  }

  getGenres(): Observable<TGenresApiResponse> {
    return this.httpService.get<TGenresApiResponse>(
      `${this.baseUrl}/genre/movie/list`
    );
  }
}
