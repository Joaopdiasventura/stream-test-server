import { Module } from "@nestjs/common";
import { BeneficiaryService } from "./beneficiary.service";
import { BeneficiaryController } from "./beneficiary.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { BeneficiarySchema } from "@core/beneficiary/entities/beneficiary.entity";
import { MongoBeneficiaryRepository } from "@core/beneficiary/repositories/beneficiary.mongo.repository";
import { BeneficiaryGateway } from './beneficiary.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Beneficiary", schema: BeneficiarySchema },
    ]),
  ],
  controllers: [BeneficiaryController],
  providers: [
    BeneficiaryService,
    { provide: "BeneficiaryRepository", useClass: MongoBeneficiaryRepository },
    BeneficiaryGateway,
  ],
})
export class BeneficiaryModule {}
