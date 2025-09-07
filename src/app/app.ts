import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/components/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  template: `
    <app-navbar />
    <main class="container mx-auto">
      <router-outlet />
    </main>
  `,
})
export class App {
  protected title = 'ng-flix';
}
