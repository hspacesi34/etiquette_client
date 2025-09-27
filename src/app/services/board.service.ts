import { Injectable } from '@angular/core';
import { Board } from '../models/board.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private apiLink = "http://localhost:8080/board";

  constructor(private http: HttpClient) { }

  addBoard(board: Board): Observable<Board> {
      const headers = new HttpHeaders({
          'Content-Type': 'application/json'
        });
      return this.http.post<Board>(this.apiLink+'/add', JSON.stringify(board), {headers, withCredentials: true});
  }

  allBoardsByUser(): Observable<Board> {
      const headers = new HttpHeaders({
          'Content-Type': 'application/json'
        });
      return this.http.get<Board>(this.apiLink+'/allByUser', {headers, withCredentials: true});
  }
}
