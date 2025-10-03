import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardColumnComponent } from "../shared/board-column/board-column.component";
import { Board } from '../models/board.model';
import { BoardService } from '../services/board.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-board-page',
  standalone: true,
  imports: [BoardColumnComponent, NgFor],
  templateUrl: './board-page.component.html',
  styleUrl: './board-page.component.scss'
})
export class BoardPageComponent implements OnInit {
  boardId: string | null = null;
  private boardService = inject(BoardService);
  private route = inject(ActivatedRoute);
  board: Board = new Board();
  boardColumns = new Array();

  constructor() {}

  ngOnInit() {
    this.boardId = this.route.snapshot.paramMap.get('id');
    console.log('boardId:', this.boardId);
    this.loadBoard();
  }

  loadBoard() {
    this.boardId = this.route.snapshot.paramMap.get('id');
    if (this.boardId) {
      this.boardService.getOneBoard(this.boardId).subscribe({
        next: (response: any) => {
          console.log('Board '+this.boardId+' fetched successfully:', response);
          this.board = response.model;
          this.boardColumns = response.model.boardColumns
        },
        error: (error: any) => {
          
        }
      });
    }
  }
  
}
