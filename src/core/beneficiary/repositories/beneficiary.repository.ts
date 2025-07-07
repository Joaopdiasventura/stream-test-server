import { CreateBeneficiaryDto } from "@core/beneficiary/dto/create-beneficiary.dto";
import { Beneficiary } from "@core/beneficiary/entities/beneficiary.entity";

export interface BeneficiaryRepository {
  create(createBeneficiaryDto: CreateBeneficiaryDto): Promise<void>;
  createMany(createBeneficiariesDto: CreateBeneficiaryDto[]): Promise<void>;
  findQuantity(): Promise<number>;
  findAll(): AsyncIterable<Beneficiary>;
  deleteAll(): Promise<void>;
}
