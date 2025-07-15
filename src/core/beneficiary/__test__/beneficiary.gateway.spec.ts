import { Test, TestingModule } from "@nestjs/testing";
import { BeneficiaryGateway } from "../beneficiary.gateway";

describe("BeneficiaryGateway", () => {
  let gateway: BeneficiaryGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BeneficiaryGateway],
    }).compile();

    gateway = module.get<BeneficiaryGateway>(BeneficiaryGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });
});
