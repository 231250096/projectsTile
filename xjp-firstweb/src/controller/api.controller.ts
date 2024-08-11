// controller/api.controller.ts
import { Controller, Post, Body, Inject} from '@midwayjs/core';
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
}