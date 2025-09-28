import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board-page',
  standalone: true,
  imports: [],
  templateUrl: './board-page.component.html',
  styleUrl: './board-page.component.scss'
})
export class BoardPageComponent implements OnInit {
  boardId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.boardId = this.route.snapshot.paramMap.get('id');
    console.log('boardId:', this.boardId);
  }
  
}
