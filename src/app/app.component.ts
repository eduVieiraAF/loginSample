import { Component, DoCheck} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck{
  title = 'loginSample';
  isMenuRequired = false

  constructor(
    private router: Router
  ) {

  }
  ngDoCheck(): void {
    let currentURL = this.router.url

    if (currentURL != '/login' && currentURL != '/register') {
      this.isMenuRequired = true
    } else {
      this.isMenuRequired = false
    }
  }
}
