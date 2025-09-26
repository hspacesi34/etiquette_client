import { Component } from "@angular/core";
import { DynamicFormComponent } from "../shared/dynamic-form/dynamic-form.component";
import { User } from "../models/user.model";
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-signin-page',
  standalone: true,
  imports: [DynamicFormComponent],
  templateUrl: './signin-page.component.html',
  styleUrl: './signin-page.component.scss',
})
export class SigninPageComponent {

  user = new User();
  private userService:UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }
  

  signinUser(user: User) {
    console.log(user.firstname);
    
    this.userService.signin(user).subscribe({
      next(response:any) {
          console.log("response: "+response.message);
      },
      error(err:any) {
          console.log("error: "+err)
      },
    });
  }
}
