import { IsEmail, IsNotEmpty } from 'class-validator';

export class RequestDTO {
  @IsNotEmpty()
  content: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  title: string;

  constructor(content: string, email: string, title: string) {
    this.content = content;
    this.email = email;
    this.title = title;
  }
}
