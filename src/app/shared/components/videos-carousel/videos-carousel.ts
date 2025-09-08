import { DatePipe } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Video } from '../../models/movie.model';

@Component({
  selector: 'app-videos-carousel',
  imports: [DatePipe],
  templateUrl: './videos-carousel.html',
  standalone: true,
})
export class VideosCarouselComponent implements OnInit {
  @Input() videos: Video[] = [];

  protected currentIndex: WritableSignal<number> = signal(0);
  protected itemsPerView: WritableSignal<number> = signal(3);
  protected maxIndex: WritableSignal<number> = signal(0);
  protected selectedVideo: WritableSignal<Video | null> = signal(null);

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.updateMaxIndex();
    this.updateItemsPerView();
  }

  private updateMaxIndex(): void {
    const max = Math.max(0, this.videos.length - this.itemsPerView());
    this.maxIndex.set(max);
  }

  private updateItemsPerView(): void {
    // Responsive items per view for videos
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 640) {
        this.itemsPerView.set(1); // sm - single video
      } else if (width < 768) {
        this.itemsPerView.set(1); // md - single video
      } else if (width < 1024) {
        this.itemsPerView.set(2); // lg - two videos
      } else if (width < 1280) {
        this.itemsPerView.set(2); // xl - two videos
      } else {
        this.itemsPerView.set(3); // 2xl - three videos
      }
    }
    this.updateMaxIndex();
  }

  protected next(): void {
    const current = this.currentIndex();
    const max = this.maxIndex();
    if (current < max) {
      this.currentIndex.set(current + 1);
    }
  }

  protected previous(): void {
    const current = this.currentIndex();
    if (current > 0) {
      this.currentIndex.set(current - 1);
    }
  }

  protected canGoNext(): boolean {
    return this.currentIndex() < this.maxIndex();
  }

  protected canGoPrevious(): boolean {
    return this.currentIndex() > 0;
  }

  protected getVisibleVideos(): Video[] {
    const start = this.currentIndex();
    const end = start + this.itemsPerView();
    return this.videos.slice(start, end);
  }

  protected getIndicatorArray(): number[] {
    return Array(this.maxIndex() + 1).fill(0);
  }

  protected getYouTubeEmbedUrl(videoKey: string): SafeResourceUrl {
    const url = `https://www.youtube.com/embed/${videoKey}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  protected getYouTubeThumbnailUrl(videoKey: string): string {
    return `https://img.youtube.com/vi/${videoKey}/maxresdefault.jpg`;
  }

  protected openVideoModal(video: Video): void {
    this.selectedVideo.set(video);
  }

  protected closeVideoModal(): void {
    this.selectedVideo.set(null);
  }
}
