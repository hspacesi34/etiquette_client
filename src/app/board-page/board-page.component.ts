import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BoardColumnComponent } from "../shared/board-column/board-column.component";
import { Board } from '../models/board.model';
import { BoardService } from '../services/board.service';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../shared/modal/modal.component';
import { DynamicFormComponent } from '../shared/dynamic-form/dynamic-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BoardcolumnService } from '../services/boardcolumn.service';
import { BoardColumn } from '../models/board-column.model';

@Component({
  selector: 'app-board-page',
  standalone: true,
  imports: [BoardColumnComponent, NgFor, MatButtonModule],
  templateUrl: './board-page.component.html',
  styleUrl: './board-page.component.scss'
})
export class BoardPageComponent implements OnInit {
  boardId: string | null = null;
  private boardService = inject(BoardService);
  private boardColumnService = inject(BoardcolumnService);
  private route = inject(ActivatedRoute);
  board: Board = new Board();
  boardColumns = new Array();
  readonly dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);

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

  openDialog() {
    const dialogRef = this.dialog.open(ModalComponent, {
          data: {
            title: 'Créer une colonne',
            componentType: DynamicFormComponent,
            componentInputs: {
              model: new BoardColumn(),
              excludeFields: ['id', 'board'],
            },
            componentOutputs: {
              formSubmit: ($event: any) => {
                this.createColumn($event);
                dialogRef.close();
              }
            }
          }
        });
  }

  createColumn(boardColumn: BoardColumn) {
    boardColumn.board = this.board;
    this.boardColumnService.addBoardColumn(boardColumn).subscribe({
      next: (response: any) => {
        console.log('BoardColumn created successfully:', response);
        this.openSnackBar(response.message);
      },
      error: (error: any) => {
        console.error('Error creating BoardColumn:', error);
        this.openSnackBar(error.error.error);
      }
    });
  }

  openSnackBar(response: string) {
      return this._snackBar.open(response, "close", { duration: 3000 });
  }
  
}
