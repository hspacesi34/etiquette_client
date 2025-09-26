import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './app.root.html',
  styleUrl: './app.root.scss'
})
export class AppComponent {
  title = 'etiquette_client';
  public _isTokenValid: boolean;
  private userService: UserService;

  constructor(userService: UserService, private router: Router) {
    this.userService = userService;
    this._isTokenValid = false;
  }

  ngOnInit() {
    this.userService.isTokenValid().subscribe({
        next: (response: any) => {
          console.log(response.status);
          if (response.status == 200) {
            this._isTokenValid = true;
          }
      }, error: (response: any) => {
          console.log(response.error.message);
          console.log(response.error.status);
          this._isTokenValid = false;
          this.router.navigate(['/login']);
      },})
  }

}
