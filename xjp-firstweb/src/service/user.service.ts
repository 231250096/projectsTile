// service/user.service.ts
import { Provide } from '@midwayjs/core';

@Provide()
export class UserService {
  static users = [
    { email: 'test@example.com', password: '1212' }
  ];

  async registerUser(email: string, password: string) {
    console.log(email)
    const userExists = UserService.users.some(user => user.email === email);
    console.log(userExists);
    if (userExists) {
      return false;
    }

    UserService.users.push({ email, password});
    console.log(UserService.users)
    return true;
  }

  async loginUser(email: string, password: string) {
    console.log(email)
    console.log(password)
    const user = UserService.users.find(user => user.email === email && user.password === password);
    console.log(UserService.users)
    if (user == undefined) {
      return { email: '0', password: '2' }
    }
    console.log(user.email)

    return user;
  }
}


