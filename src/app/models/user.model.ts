export class User {

    constructor(
    public id: number | null = null,
    public firstname: string = '',
    public lastname: string = '',
    public email: string = '',
    public password: string = ''
  ) {}
}
