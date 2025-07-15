import { SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { BeneficiaryService } from "@core/beneficiary/beneficiary.service";
import { CreateBeneficiaryDto } from "@core/beneficiary/dto/create-beneficiary.dto";

@WebSocketGateway({ cors: { origin: "*" } })
export class BeneficiaryGateway {
  public constructor(private readonly beneficiaryService: BeneficiaryService) {}

  @SubscribeMessage("beneficiary:create")
  public async handleCreateBeneficiaries(
    _: Socket,
    payload: CreateBeneficiaryDto[],
  ): Promise<number> {
    await this.beneficiaryService.create(payload);
    return payload.length;
  }
}
