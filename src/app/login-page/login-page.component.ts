import { Component, inject } from '@angular/core';
import { DynamicFormComponent } from '../shared/dynamic-form/dynamic-form.component';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { MatButton } from "@angular/material/button";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [DynamicFormComponent, MatSnackBarModule, RouterLink, MatButton],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
    user = new User();
    private userService:UserService;
    private router: Router;
    private _snackBar = inject(MatSnackBar);
  
    constructor(userService: UserService, router: Router) {
      this.userService = userService;
      this.router = router;
    }

    openSnackBar(response: string) {
      return this._snackBar.open(response, "close", { duration: 3000 });
    }
  
    loginUser(user: User) {
      this.userService.login(user).subscribe({
        next: (response:any) => {
            console.log(response);
            this.openSnackBar(response.message).afterDismissed().subscribe(
              () => {
                this.router.navigate(['/']);
              }
            );
        },
        error: (err:any) => {
          console.log(err.error.message);
          this.openSnackBar(err.error.message);
        },
      });
    }
}
