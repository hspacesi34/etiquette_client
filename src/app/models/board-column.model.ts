import { Board } from "./board.model";

export class BoardColumn {
    constructor(
        public id: number = 0,
        public name: string = '',
        public board: Board = new Board()
    ){}
}
