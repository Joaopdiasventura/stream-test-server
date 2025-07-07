import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ versionKey: false })
export class Beneficiary extends Document<string, Beneficiary, Beneficiary> {
  @Prop()
  public name: string;
  @Prop()
  public age: number;
  @Prop()
  public cpf: string;
}

export const BeneficiarySchema = SchemaFactory.createForClass(Beneficiary);
