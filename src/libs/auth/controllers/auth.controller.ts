import { Controller, Post, Body } from '@nestjs/common';
import { LoginAuthDto } from '../dto';
import { AuthService } from '../services/auth.service';
import { CreateDriverDto } from 'src/module/driver/dto';
import { CreateOwnerDto } from 'src/module/owner/dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register/driver')
  registerDriver(@Body() createDriverDto: CreateDriverDto) {
    return this.authService.registerDriver(createDriverDto);
  }

  @Post('register/owner')
  registerOwner(@Body() createOwnerDto: CreateOwnerDto) {
    return this.authService.registerOwner(createOwnerDto);
  }

  @Post('login')
  loginDriver(@Body() loginDriverDto: LoginAuthDto) {
    return this.authService.login(loginDriverDto);
  }
}
