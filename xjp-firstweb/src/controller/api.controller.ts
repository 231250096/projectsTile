// controller/api.controller.ts
import { Controller, Post, Body, Inject, Get, Param, Put} from '@midwayjs/core';
import { UserService } from '../service/user.service';

@Controller('/api')
export class ApiController {
  @Inject()
  userService: UserService;

  @Post('/register')
  async register(@Body() body: any) {
    const email = body.email;
    const password = body.password;
    // await this.userService.registerUser(username, password, email);
    console.log('Request body:', body);
    console.log(password)
    if(await this.userService.registerUser(email, password)){
    return { success: true };
    }else{
    return {success: false}}
  }

  @Post('/login')
  async login(@Body() body: any) {
    console.log("ok");
    const { email, password } = body;
    const user = await this.userService.loginUser(email, password);
    console.log(email)
    console.log(password)
    if(user.email == '0'){
      return {success: false, user};
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
}