import { HttpClient, HttpHeaders, withInterceptors } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiLink = "http://localhost:8080/user";

  constructor(private http: HttpClient) { }

  signin(user: User): Observable<User> {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    return this.http.post<User>(this.apiLink+'/signin', JSON.stringify(user), {headers, withCredentials: true});
  }

  login(user: User): Observable<User> {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    return this.http.post<User>(this.apiLink+'/login', JSON.stringify(user), {headers, withCredentials: true});
  }

  isTokenValid() {
    return this.http.post(this.apiLink+'/istokenvalid', null, {withCredentials: true});
  }

}
