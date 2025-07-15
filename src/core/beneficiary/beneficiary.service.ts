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

  public async create(
    createBeneficiariesDto: CreateBeneficiaryDto[],
  ): Promise<void> {
    await this.beneficiaryRepository.createMany(createBeneficiariesDto);
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

    const workbook = new ExcelJS.stream.xlsx.WorkbookWriter({
      stream,
      useStyles: true,
      useSharedStrings: true,
    });

    const worksheet = workbook.addWorksheet("beneficiarios", {
      views: [{ showGridLines: false }],
    });

    worksheet.columns = [
      { header: "Nome", key: "name", width: 30 },
      { header: "Idade", key: "age", width: 10 },
      { header: "CPF", key: "cpf", width: 20 },
    ];

    const headerRow = worksheet.getRow(1);

    headerRow.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF006400" },
      };
      cell.font = { color: { argb: "FFFFFFFF" }, bold: true };
      cell.alignment = { horizontal: "center", vertical: "middle" };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    headerRow.commit();

    for await (const beneficiary of this.beneficiaryRepository.findAll()) {
      const row = worksheet.addRow(beneficiary);
      row.eachCell(
        (cell) =>
          (cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          }),
      );
      row.commit();
    }

    await workbook.commit();
  }

  public async reset(): Promise<Message> {
    await this.beneficiaryRepository.deleteAll();
    return { message: "Banco de dados reiniciado" };
  }
}
