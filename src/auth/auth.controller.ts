import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { name: string; password: string }) {
    console.log('Login request received:', body);
    return this.authService.login(body.name, body.password);
  }

  @Post('register')
  async register(
    @Body() { name, password }: { name: string; password: string },
  ) {
    return this.authService.register(name, password);
  }
}
