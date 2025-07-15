import { Controller, Delete, Get, Res } from "@nestjs/common";
import { BeneficiaryService } from "./beneficiary.service";
import { Message } from "@shared/interfaces/messages/message";
import type { Response } from "express";

@Controller("beneficiary")
export class BeneficiaryController {
  public constructor(private readonly beneficiaryService: BeneficiaryService) {}

  @Get()
  public findAll(@Res() res: Response): Promise<void> {
    return this.beneficiaryService.findAll(res);
  }

  @Delete()
  public reset(): Promise<Message> {
    return this.beneficiaryService.reset();
  }
}
