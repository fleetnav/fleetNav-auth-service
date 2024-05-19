import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class Owner extends Document {
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
  number_buses: number;

  @ApiProperty()
  @Prop({ required: true })
  role: string;

  @ApiProperty()
  @Prop({ required: true, default: 1 })
  avatarNumber: number;
}

export const OwnerSchema = SchemaFactory.createForClass(Owner);
