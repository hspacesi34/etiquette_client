import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  
  signin(user: User): Observable<User> {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    return this.http.post<User>('http://localhost:8080/user/signin', JSON.stringify(user), {headers});
  }

}
