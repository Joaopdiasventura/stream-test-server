import { Inject, Injectable } from "@nestjs/common";
import { PassThrough } from "node:stream";
import { BeneficiaryRepository } from "@core/beneficiary/repositories/beneficiary.repository";
import { CreateBeneficiaryDto } from "@core/beneficiary/dto/create-beneficiary.dto";
import { Message } from "@shared/interfaces/messages/message";
import type { Response } from "express";
import * as ExcelJS from "exceljs";

@Injectable()
export class BeneficiaryService {
  public constructor(
    @Inject("BeneficiaryRepository")
    private readonly beneficiaryRepository: BeneficiaryRepository,
  ) {}

  public async create(createBeneficiariesDto: CreateBeneficiaryDto[]): Promise<void> {
    await this.beneficiaryRepository.createMany(createBeneficiariesDto)
  }

  public async findQuantity(): Promise<number> {
    return await this.beneficiaryRepository.findQuantity();
  }

  public async findAll(res: Response): Promise<void> {
    const stream = new PassThrough();

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="beneficiarios.xlsx"',
    );

    stream.pipe(res);

    const workbook = new ExcelJS.stream.xlsx.WorkbookWriter({ stream });
    const worksheet = workbook.addWorksheet("beneficiarios");

    worksheet.columns = [
      { header: "Nome", key: "name", width: 30 },
      { header: "Idade", key: "age", width: 10 },
      { header: "CPF", key: "cpf", width: 20 },
    ];

    const cursor = this.beneficiaryRepository.findAll();

    for await (const { name, age, cpf } of cursor)
      worksheet.addRow({ name, age, cpf }).commit();

    await workbook.commit();
  }

  public async reset(): Promise<Message> {
    await this.beneficiaryRepository.deleteAll();
    return { message: "Banco de dados reiniciado" };
  }
}
