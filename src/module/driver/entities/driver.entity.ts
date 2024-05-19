import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

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
}

export const DriverSchema = SchemaFactory.createForClass(Driver);
