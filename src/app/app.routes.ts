import { Routes } from '@angular/router';
import { SigninPageComponent } from './signin-page/signin-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { BoardPageComponent } from './board-page/board-page.component';

export const routes: Routes = [
    {path:"", component: HomePageComponent},
    {path:"signin", component: SigninPageComponent},
    {path:"login", component: LoginPageComponent},
    {path:"board/:id", component: BoardPageComponent}
];
