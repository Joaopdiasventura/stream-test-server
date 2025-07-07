import { Module } from '@nestjs/common';
import { BeneficiaryModule } from './beneficiary/beneficiary.module';

@Module({
  imports: [BeneficiaryModule]
})
export class CoreModule {}
