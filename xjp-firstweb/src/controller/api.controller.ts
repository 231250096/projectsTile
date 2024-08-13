// controller/api.controller.ts
import { Controller, Post, Body, Inject, Get, Param, Put, File } from '@midwayjs/core';
import { UserService } from '../service/user.service';
import * as fs from 'fs'
import * as path from 'path'
@Controller('/api')
export class ApiController {
  @Inject()
  userService: UserService;

  @Post('/register')
  async register(@Body() body: any) {
    const email = body.email;
    const password = body.password;
    console.log('Request body:', body);
    console.log(password);
    if (await this.userService.registerUser(email, password)) {
      return { success: true };
    } else {
      return { success: false };
    }
  }

  @Post('/login')
  async login(@Body() body: any) {
    console.log("ok");
    const { email, password } = body;
    const user = await this.userService.loginUser(email, password);
    console.log(email);
    console.log(password);
    console.log(UserService.users)
    if (user.email === '0') {
      return { success: false, user };
    }
    return { success: true, user };
  }

  @Get('/user/:id')
  async getUser(@Param('id') id: number) {
    const user = await this.userService.getUserById(id);
    if (!user) {
      return { success: false, message: 'User not found' };
    }
    return { success: true, user };
  }

  @Put('/updateEvents/:id')
  async updateUser(@Param('id') id: number, @Body() body: { events: any[] }) {
    const success = await this.userService.updateUserEvents(id, body.events);
    if (success) {
      return { message: 'Events updated successfully' };
    }
    return { message: 'Failed to update events' };
  }

  @Post('/uploadFile/:id')
  async uploadFile(@Param('id') id: any, @File('file') file?: any) {
    if (!file) {
      console.log("后端未取到file")
    }
    console.log("后端取到file", file)
    const filePath = path.join(__dirname, '..', '..', '..', 'projects', 'public', 'files', file.filename);
    console.log("后端获取附件路径", filePath);
    const sourceStream = fs.createReadStream(file.data)
    const targetStream = fs.createWriteStream(filePath);
    sourceStream.pipe(targetStream);
    // 处理文件（例如，保存文件路径到数据库）
    
    // 你可以在这里处理文件上传逻辑，比如保存到磁盘或云存储
    await this.userService.updateFilePath(id, `../../public/files/${file.filename}`)
    return { fileURL: `../../public/files/${file.filename}`};
  }

  @Get('/getFile/:id')
  async getFile(@Param('id') id: any) {
    const file = await this.userService.getFileById(id);
    if (!file) {
      return { success: false, message: 'User not found' };
    }
    return { success: true, file };

  }

  @Get('/AllUsers')
  async getUsers() {
    const users = await this.userService.getAllUsers();
    if (!users || users.length === 0) {
      return { success: false, message: 'No users found' };
    }
    return users;
  }
}
