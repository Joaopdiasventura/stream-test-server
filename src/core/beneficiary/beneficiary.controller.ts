import { Controller, Post, Delete, Get, Res, Body } from "@nestjs/common";
import { BeneficiaryService } from "./beneficiary.service";
import { Message } from "@shared/interfaces/messages/message";
import type { Response } from "express";
import { CreateBeneficiaryDto } from "@core/beneficiary/dto/create-beneficiary.dto";

@Controller("beneficiary")
export class BeneficiaryController {
  public constructor(private readonly beneficiaryService: BeneficiaryService) {}

  @Post()
  public streamUpload(
    @Body() createBeneficiariesDto: CreateBeneficiaryDto[],
  ): Promise<void> {
    return this.beneficiaryService.create(createBeneficiariesDto);
  }

  @Get()
  public findAll(@Res() res: Response): Promise<void> {
    return this.beneficiaryService.findAll(res);
  }

  @Get("qnt")
  public findQuantity(): Promise<number> {
    return this.beneficiaryService.findQuantity();
  }

  @Delete()
  public reset(): Promise<Message> {
    return this.beneficiaryService.reset();
  }
}
