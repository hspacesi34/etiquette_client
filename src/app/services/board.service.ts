import { Injectable } from '@angular/core';
import { Board } from '../models/board.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private refreshBoardsSubject = new BehaviorSubject<void>(undefined);
  private apiLink = "/api/board";

  constructor(private http: HttpClient) { }

  // Method to trigger refresh
  refreshBoards() {
    this.refreshBoardsSubject.next();
  }

  // Observable that components can subscribe to
  get refreshNeeded$() {
    return this.refreshBoardsSubject.asObservable();
  }

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
