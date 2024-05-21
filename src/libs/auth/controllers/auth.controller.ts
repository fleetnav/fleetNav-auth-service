import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { LoginAuthDto } from '../dto';
import { AuthService } from '../services/auth.service';
import { CreateDriverDto } from 'src/module/driver/dto';
import { CreateOwnerDto } from 'src/module/owner/dto';
import { AtGuard } from '../guard/auth.guard';
import { Roles } from '../../decorators/roles/roles.decorators';
import { Role } from '../../decorators/roles/role.enum';
import { IsPublic } from '../../decorators/public.decorator';

@Controller('auth')
@UseGuards(AtGuard)
export class AuthController {
    
  constructor(private readonly authService: AuthService) {}

  @Post('register/driver')
  @Roles(Role.Driver)
  registerDriver(@Body() createDriverDto: CreateDriverDto) {
    return this.authService.registerDriver(createDriverDto);
  }

  @Post('register/owner')
  @Roles(Role.Owner)
  registerOwner(@Body() createOwnerDto: CreateOwnerDto) {
    return this.authService.registerOwner(createOwnerDto);
  }

  @Post('login/driver')
  @IsPublic() // Ruta pública
  loginDriver(@Body() loginDriverDto: LoginAuthDto) {
    return this.authService.loginDriver(loginDriverDto);
  }

  @Post('login/owner')
  @IsPublic() // Ruta pública
  loginOwner(@Body() loginOwnerDto: LoginAuthDto) {
    return this.authService.loginOwner(loginOwnerDto);
  }

}