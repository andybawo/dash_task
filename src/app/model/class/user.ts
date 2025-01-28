export class User {
  userId: number;
  fName: string;
  lName: string;
  email: string;
  phoneNumber: number;
  password: string;

  constructor() {
    this.userId = 0;
    this.fName = '';
    this.lName = '';
    this.email = '';
    this.phoneNumber = 0;
    this.password = '';
  }
}
