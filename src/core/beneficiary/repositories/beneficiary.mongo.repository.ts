import { CreateBeneficiaryDto } from "@core/beneficiary/dto/create-beneficiary.dto";
import { Beneficiary } from "@core/beneficiary/entities/beneficiary.entity";
import { BeneficiaryRepository } from "@core/beneficiary/repositories/beneficiary.repository";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

export class MongoBeneficiaryRepository implements BeneficiaryRepository {
  public constructor(
    @InjectModel("Beneficiary")
    private readonly beneficiaryModel: Model<Beneficiary>,
  ) {}

  public async create(
    createBeneficiaryDto: CreateBeneficiaryDto,
  ): Promise<void> {
    await this.beneficiaryModel.insertOne(createBeneficiaryDto);
  }

  public async createMany(docs: CreateBeneficiaryDto[]): Promise<void> {
    await this.beneficiaryModel.bulkWrite(
      docs.map((doc) => ({
        insertOne: { document: doc },
      })),
      { ordered: false },
    );
  }

  public async findQuantity(): Promise<number> {
    return await this.beneficiaryModel.countDocuments().exec();
  }

  public findAll(): AsyncIterable<Beneficiary> {
    return this.beneficiaryModel.find().lean().cursor();
  }

  public async deleteAll(): Promise<void> {
    await this.beneficiaryModel.deleteMany().exec();
  }
}
