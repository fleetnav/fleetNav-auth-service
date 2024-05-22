import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export enum Role {
  Owner = 'owner',
  Driver = 'driver',
}

@Schema({ timestamps: true })
export class Driver extends Document {
  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  @Prop({ required: true })
  email: string;

  @ApiProperty()
  @Prop({ required: true })
  password: string;

  @ApiProperty()
  @Prop({ required: true })
  phone: number;

  @ApiProperty()
  @Prop({ required: true })
  license: number;

  @ApiProperty()
  @Prop({ required: true })
  age: number;

  @ApiProperty()
  @Prop({ required: true })
  id_owner: string;

  @ApiProperty()
  @Prop({ required: true })
  role: string;

  @ApiProperty()
  @Prop({ required: true, default: 1 })
  avatarNumber: number;
}

export const DriverSchema = SchemaFactory.createForClass(Driver);
