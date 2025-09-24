import { Routes } from '@angular/router';
import { SigninPageComponent } from './signin-page/signin-page.component';
import { AppComponent } from './app.root';
import { HomePageComponent } from './home-page/home-page.component';

export const routes: Routes = [
    {path:"", component: HomePageComponent},
    {path:"signin", component: SigninPageComponent}
];
