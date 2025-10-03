import { Component, Input } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonModule} from '@angular/material/button';
import { BoardColumn } from '../../models/board-column.model';

@Component({
  selector: 'app-board-column',
  standalone: true,
  imports: [MatProgressBarModule, MatCardModule, MatChipsModule, MatButtonModule],
  templateUrl: './board-column.component.html',
  styleUrl: './board-column.component.scss'
})
export class BoardColumnComponent {
  name: string = "name";
  @Input() boardColumn: BoardColumn = new BoardColumn();

  ngOnInit() {
    
  }

  
}
