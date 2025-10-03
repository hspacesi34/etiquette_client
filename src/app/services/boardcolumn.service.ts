import { Injectable } from '@angular/core';
import { BoardColumn } from '../models/board-column.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BoardcolumnService {
  private apiLink = "/api/boardcolumn";

  constructor(private http: HttpClient) { }

  addBoardColumn(boardColumn: BoardColumn): Observable<BoardColumn> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
          });
        return this.http.post<BoardColumn>(this.apiLink+'/add', JSON.stringify(boardColumn), {headers, withCredentials: true});
  }
}
