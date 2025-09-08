import {
  Component,
  Input,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { Cast } from '../../models/movie.model';

@Component({
  selector: 'app-cast-carousel',
  imports: [],
  templateUrl: './cast-carousel.html',
  standalone: true,
})
export class CastCarouselComponent implements OnInit {
  @Input() cast: Cast[] = [];
  @Input() profileImageUrl: string = '';

  protected currentIndex: WritableSignal<number> = signal(0);
  protected itemsPerView: WritableSignal<number> = signal(6);
  protected maxIndex: WritableSignal<number> = signal(0);

  ngOnInit(): void {
    this.updateMaxIndex();
    this.updateItemsPerView();
  }

  private updateMaxIndex(): void {
    const max = Math.max(0, this.cast.length - this.itemsPerView());
    this.maxIndex.set(max);
  }

  private updateItemsPerView(): void {
    // Responsive items per view
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 640) {
        this.itemsPerView.set(2); // sm
      } else if (width < 768) {
        this.itemsPerView.set(3); // md
      } else if (width < 1024) {
        this.itemsPerView.set(4); // lg
      } else if (width < 1280) {
        this.itemsPerView.set(5); // xl
      } else {
        this.itemsPerView.set(6); // 2xl
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

  protected getVisibleCast(): Cast[] {
    const start = this.currentIndex();
    const end = start + this.itemsPerView();
    return this.cast.slice(start, end);
  }

  protected getIndicatorArray(): number[] {
    return Array(this.maxIndex() + 1).fill(0);
  }
}
