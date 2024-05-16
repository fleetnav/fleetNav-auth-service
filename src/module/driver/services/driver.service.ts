import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDriverDto } from '../dto/create.driver.dto';
import { UpdateDriverDto } from '../dto/update-driver.dto';
import {hash} from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Driver } from '../entities/driver.entity';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class DriverService {

  constructor(@InjectModel(Driver.name) private driverModel: Model<Driver>) {}

  async create(createDriverDto: CreateDriverDto) {

    const { password, email } = createDriverDto
    
    const existingUser = await this.driverModel.findOne({ email }).exec();

    if (existingUser) {
      throw new HttpException('Driver already exists', HttpStatus.CONFLICT);
    }
    
    const plainToHash= await hash(password, 10) 
    createDriverDto = {
      ...createDriverDto,
      password: plainToHash
    }
    
    const createDriver = await this.driverModel.create(createDriverDto)
    
    return createDriver;
  }

  async findAll() {
    const drivers = await this.driverModel.find().exec();
    
    if (drivers.length === 0){
      throw new NotFoundException('Records not found in database');
    }

    return drivers;
  }

  async findOne(id: string) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }

    const driver = await this.driverModel.findById(id).exec();
    
    if (!driver) {
      throw new NotFoundException(`Driver with id ${id} not found`);
    }
    return driver;
  }

  async findOneByEmail(email: string): Promise<Driver> {

    const driver = await this.driverModel.findOne({ email }).exec();
    
    if (!driver) {
      throw new NotFoundException(`Driver with email ${email} not found`);
    }
    
    return driver;
  
  }

  async update(id: number, updateDriverDto: UpdateDriverDto) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }

    const updateDriver = await this.driverModel.findByIdAndUpdate(id, updateDriverDto, { new: true }).exec();

    if (!updateDriver) {
      throw new NotFoundException(`Driver with id ${id} not found`);
    }

    return updateDriver;

  }

  async remove(id: number) {
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }

    const driver = await this.driverModel.findByIdAndDelete(id).exec();
    
    if (!driver) {
      throw new NotFoundException(`Driver with id ${id} not found`);
    }
    
    return 'Driver deleted successfully'

  }

}