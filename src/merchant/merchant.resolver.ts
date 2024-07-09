import { Resolver, Query } from "@nestjs/graphql";
import { Merchant } from "./models/merchant.model";
import { MerchantService } from "./merchant.service";

@Resolver(of => Merchant)
export class MerchantsResolver {
    constructor(private merchantService: MerchantService) {}

    @Query(returns => [Merchant])
    async merchants() {
        return await this.merchantService.getMerchants();
    }
}