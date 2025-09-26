import { Component, inject } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { ModalComponent } from '../shared/modal/modal.component';
import { DynamicFormComponent } from '../shared/dynamic-form/dynamic-form.component';
import { Board } from '../models/board.model';
import { BoardService } from '../services/board.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  readonly dialog = inject(MatDialog);
  board = new Board();
  private _snackBar = inject(MatSnackBar);
  
  constructor(private boardService: BoardService) {}

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
          excludeFields: ['userOwner'],
        },
        componentOutputs: {
          formSubmit: ($event: any) => {
            this.createBoard($event);
            dialogRef.close();
          }
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Form submitted:', result);
      }
    });

  }
  createBoard(board: Board) {
    console.log(board);
    this.boardService.addBoard(board).subscribe({
      next: (response: any) => {
        console.log('Board created successfully:', response);
        this.openSnackBar(response.message);
      },
      error: (error: any) => {
        console.error('Error creating board:', error);
        this.openSnackBar(error.error.error);
      }
    });
  }
}
