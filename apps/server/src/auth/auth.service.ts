import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {}
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];
  async findOne(username: string) {
    return this.users.find((user) => user.username === username);
  }

  async validateUser(username: string, pass: string): Promise<any> {
    return this.users.find(
      (user) => user.username === username && user.password === pass,
    );
  }
}
