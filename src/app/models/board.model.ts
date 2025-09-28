import { User } from "./user.model";

export class Board {

    constructor(
    public id: number = 0,
    public name: string = '',
    public description: string = '',
    public userOwner: User = new User()
  ) {}
}