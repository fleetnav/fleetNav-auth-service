import { HttpException, Injectable } from '@nestjs/common';
import { LoginAuthDto } from '../dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { DriverService } from 'src/module/driver/services/driver.service';
import { OwnerService } from 'src/module/owner/serivices/owner.service';
import { CreateDriverDto } from 'src/module/driver/dto';
import { CreateOwnerDto } from 'src/module/owner/dto';

@Injectable()
export class AuthService {
  constructor(
    private driverService: DriverService,
    private ownerService: OwnerService,
    private jwtService: JwtService,
  ) {}

  async registerDriver(registerDriverDto: CreateDriverDto) {
    const driverCreated = await this.driverService.create(registerDriverDto);
    return driverCreated;
  }

  async registerOwner(registerOwnerDto: CreateOwnerDto) {
    const ownerCreated = await this.ownerService.create(registerOwnerDto);
    const payload = { id: ownerCreated._id, email: ownerCreated.email };

    const token = await this.jwtService.sign(payload);

    return { user: ownerCreated, token };
  }

  async login(loginDriverDto: LoginAuthDto) {
    const { email, password } = loginDriverDto;

    let user = null;
    try {
      const owner = await this.ownerService.findOneByEmail(email);
      user = owner;
    } catch (error) {
      const driver = await this.driverService.findOneByEmail(email);
      user = driver;
    }

    const checkPassword = await compare(password, user?.password);

    if (!checkPassword) throw new HttpException('PASSWORD INVALID', 403);

    const payload = { id: user._id, email: user.email };

    const token = await this.jwtService.sign(payload);

    return { user: user, token };
  }
}
