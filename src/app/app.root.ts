import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { UserService } from './services/user.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './app.root.html',
  styleUrl: './app.root.scss'
})
export class AppComponent {
  title = 'etiquette_client';
  private userService: UserService;
  private navigationSubscription: any;
  
  constructor(userService: UserService, private router: Router) {
    this.userService = userService;
  }

  ngOnInit() {
    this.navigationSubscription = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(event => {
        const navEnd = event as NavigationEnd;

        if (navEnd.urlAfterRedirects != "/" && navEnd.urlAfterRedirects != "/login" && navEnd.urlAfterRedirects != "/signin") {
          this.userService.isTokenValid().subscribe({
              next: () => {
                
            }, error: () => {
                this.router.navigate(['/login']);
            },})
        }
      });
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

}
