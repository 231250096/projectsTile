// service/user.service.ts
import { Provide } from '@midwayjs/core';

@Provide()
export class UserService {
  static nextId = 2; // 初始ID从2开始
  static users = [
    { id: 1, email: 'test@example.com', password: '1212', events: [
      {
        title: '第一个项目',
        ['To do']: [],
        ['In progress']: [],
        ['Completed']: [],
      }
    ]}
  ];
  static files = [];
  static comments = [];

  async registerUser(email: string, password: string) {
    console.log(email)
    const userExists = UserService.users.some(user => user.email === email);
    console.log(userExists);
    if (userExists) {
      return false;
    }
    const id = UserService.nextId;
    UserService.nextId++;
    UserService.users.push({ id, email, password, events: [
      {
        title: '第一个项目',
        ['To do']: [],
        ['In progress']: [],
        ['Completed']: [],
      }
    ]});
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

  async getUserById(id : number) {
    return UserService.users.find(user => user.id === id);
  }

  async updateUserEvents(id: number, events: any[]) {
    const user = UserService.users.find(user => user.id === id);
    console.log(user)
    if (user) {
      user.events = events;
      console.log('updated', user)
      return true;
    }
    return false;
  }

  async updateFilePath(id: any, filepath: string) {
    console.log(filepath)
    console.log(id);
    const idExists = UserService.files.some(file => file.id === id);
    if (idExists) {
      return false;
    }
    UserService.files.push({id, filepath});
    console.log(UserService.files)
    return true;
  }

  async getFileById(id : any) {
    const idExists = UserService.files.some(file => file.id === id);
    if(!idExists){
      return {id: '0', filepath: '0'}
    }
    return UserService.files.find(file => file.id === id);
  }

  async getAllUsers() {
    return UserService.users;
  }

}


