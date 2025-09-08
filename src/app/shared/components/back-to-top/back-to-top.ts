import { DOCUMENT } from '@angular/common';
import {
  Component,
  HostListener,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';

@Component({
  selector: 'app-back-to-top',
  imports: [],
  templateUrl: 'back-to-top.html',
  standalone: true,
})
export class BackToTopComponent implements OnInit {
  private document = inject(DOCUMENT);

  protected isVisible: WritableSignal<boolean> = signal(false);
  private scrollThreshold = 300; // Show button after scrolling 300px

  ngOnInit(): void {
    this.checkScrollPosition();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.checkScrollPosition();
  }

  private checkScrollPosition(): void {
    const scrollTop =
      this.document.documentElement.scrollTop || this.document.body.scrollTop;
    this.isVisible.set(scrollTop > this.scrollThreshold);
  }

  protected scrollToTop(): void {
    this.document.documentElement.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
