import { HttpException, Injectable } from '@nestjs/common';
import { LoginAuthDto } from '../dto';
import { compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { DriverService } from 'src/module/driver/services/driver.service';
import { OwnerService } from 'src/module/owner/serivices/owner.service';
import { CreateDriverDto } from 'src/module/driver/dto';
import { CreateOwnerDto } from 'src/module/owner/dto';

@Injectable()
export class AuthService {

  constructor ( 
    private driverService: DriverService,
    private ownerService: OwnerService,
    private jwtService: JwtService
  ) {}

  async registerDriver(registerDriverDto: CreateDriverDto) {
    const driverCreated = await this.driverService.create(registerDriverDto)
    return driverCreated
  }

  async registerOwner(registerOwnerDto: CreateOwnerDto) {
    const ownerCreated = await this.ownerService.create(registerOwnerDto)
    return ownerCreated
  }

  async loginDriver(loginDriverDto: LoginAuthDto) {
    
    const { email, password } = loginDriverDto
    const driver = await this.driverService.findOneByEmail(email)
    
    const checkPassword = await compare(password, driver.password)

    if (!checkPassword) throw new HttpException('PASSWORD INVALID', 403)

    const payload = { id: driver._id, email: driver.email }

    const token = await this.jwtService.sign(payload)

    return { user: driver, token }

  }

  async loginOwner(loginOwnerDto: LoginAuthDto) {

    const { email, password } = loginOwnerDto
    const owner = await this.ownerService.findOneByEmail(email)
    
    const checkPassword = await compare(password, owner.password)

    if (!checkPassword) throw new HttpException('PASSWORD INVALID', 403)

    const payload = { id: owner._id, email: owner.email }

    const token = await this.jwtService.sign(payload)
  
    return { user: owner, token }

  }

}