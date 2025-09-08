import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BackToTopComponent } from './shared/components/back-to-top/back-to-top';
import { Navbar } from './shared/components/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, BackToTopComponent],
  template: `
    <app-navbar />
    <main class="container mx-auto mt-20">
      <router-outlet />
    </main>
    <app-back-to-top />
  `,
})
export class App {
  protected title = 'ng-flix';
}
