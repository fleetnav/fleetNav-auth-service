import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOwnerDto } from '../dto/create-owner.dto';
import { hash } from 'bcrypt';
import { UpdateOwnerDto } from '../dto/update-owner.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Owner } from '../entities/owner.entity';
import { Driver } from 'src/module/driver/entities/driver.entity';

@Injectable()
export class OwnerService {
  constructor(
    @InjectModel(Owner.name) private ownerModel: Model<Owner>,
    @InjectModel(Driver.name) private driverModel: Model<Driver>,
  ) {}

  async create(createOwnerDto: CreateOwnerDto) {
    const { password, email } = createOwnerDto;
    const existingOwner = await this.ownerModel.findOne({ email }).exec();

    if (existingOwner) {
      throw new HttpException('Owner already exists', HttpStatus.CONFLICT);
    }

    const plainToHash = await hash(password, 10);
    createOwnerDto = {
      ...createOwnerDto,
      password: plainToHash,
    };

    const createOwner = await this.ownerModel.create(createOwnerDto);

    return createOwner;
  }

  async findAll() {
    const owners = await this.ownerModel.find().exec();

    if (owners.length === 0) {
      throw new NotFoundException('Records not found in database');
    }

    return owners;
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }

    const owner = await this.ownerModel.findById(id).exec();

    if (!owner) {
      throw new NotFoundException(`Owner with id ${id} not found`);
    }

    return owner;
  }

  async findByOwnerId(ownerId: string) {
    const drivers = await this.driverModel.find({ id_owner: ownerId }).exec();

    if (drivers.length >= 0) {
      throw new NotFoundException(`Drivers dont exist`);
    }

    return drivers;
  }

  async findOneByEmail(email: string): Promise<Owner> {
    const owner = await this.ownerModel.findOne({ email }).exec();

    if (!owner) {
      throw new NotFoundException(`Owner with email ${email} not found`);
    }

    return owner;
  }

  async update(id: number, updateOwnerDto: UpdateOwnerDto) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }

    const updateOwner = await this.ownerModel
      .findByIdAndUpdate(id, updateOwnerDto, { new: true })
      .exec();

    if (!updateOwner) {
      throw new NotFoundException(`Driver with id ${id} not found`);
    }

    return updateOwner;
  }

  async remove(id: number) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }

    const driver = await this.ownerModel.findByIdAndDelete(id).exec();

    if (!driver) {
      throw new NotFoundException(`Owner with id ${id} not found`);
    }

    return 'Owner deleted successfully';
  }
}
