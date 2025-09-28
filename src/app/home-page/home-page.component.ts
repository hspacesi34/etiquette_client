import { Component, inject } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { ModalComponent } from '../shared/modal/modal.component';
import { DynamicFormComponent } from '../shared/dynamic-form/dynamic-form.component';
import { Board } from '../models/board.model';
import { BoardService } from '../services/board.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgFor } from '@angular/common';
import { RouterLink } from "@angular/router";
import { skip, Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  readonly dialog = inject(MatDialog);
  board = new Board();
  private _snackBar = inject(MatSnackBar);
  boardsByUser: Board[] = [];
  private boardService = inject(BoardService);
  private refreshSubscription: Subscription = new Subscription();
  
  constructor() {}

  ngOnInit() {
    // Load initial data
    this.loadBoards();

    // Subscribe to refresh events, skip the initial emission
    this.refreshSubscription = this.boardService.refreshNeeded$
      .pipe(skip(1))  // Skip the initial emission
      .subscribe(() => {
        this.loadBoards();
    });
  }

  loadBoards() {
    this.boardService.allBoardsByUser().subscribe({
      next: (response: any) => {
        console.log('Boards fetched successfully:', response);
        this.boardsByUser = response.models;
      },
      error: (error: any) => {
        
      }
    });
  }

  openSnackBar(response: string) {
      return this._snackBar.open(response, "close", { duration: 3000 });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        title: 'Créer une board',
        componentType: DynamicFormComponent,
        componentInputs: {
          model: this.board,
          excludeFields: ['id', 'userOwner'],
        },
        componentOutputs: {
          formSubmit: ($event: any) => {
            this.createBoard($event);
            dialogRef.close();
          }
        }
      }
    });

  }

  createBoard(board: Board) {
    this.boardService.addBoard(board).subscribe({
      next: (response: any) => {
        console.log('Board created successfully:', response);
        this.openSnackBar(response.message);
        this.boardService.refreshBoards();
      },
      error: (error: any) => {
        console.error('Error creating board:', error);
        this.openSnackBar(error.error.error);
      }
    });
  }

  ngOnDestroy() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }
}
