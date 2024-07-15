import { Resolver, Query, Mutation, Args, Context } from "@nestjs/graphql";
import { Merchants } from "./models/getMerchants.model";
import { MerchantService } from "./merchant.service";
import { Merchant, MerchantInput } from "./models/createMerchant.model";
import { UpdateMerchant } from "./models/updateMerchant.model";
import { exportJwtTokenFromRequest } from "src/helpers/jwt-token.helper";

@Resolver(of => Merchants)
export class MerchantsResolver {
    constructor(private merchantService: MerchantService) {}

    @Query(returns => Merchants)
    async merchants(@Context() context: any) {
        const jwtToken = exportJwtTokenFromRequest(context);
        return await this.merchantService.getMerchants(jwtToken);
    }

    @Mutation(returns => Merchant)
    async addMerchant(@Args('merchant') merchant: MerchantInput, @Context() context: any) {
        const jwtToken = exportJwtTokenFromRequest(context);
        return await this.merchantService.addMerchant(merchant, jwtToken);
    }

    @Mutation(returns => Merchants)
    async updateMerchant(@Args('merchantData') merchant: UpdateMerchant, @Args('cif') cif: string, @Context() context: any) {
        const jwtToken = exportJwtTokenFromRequest(context);
        return await this.merchantService.updateMerchant(merchant, cif, jwtToken);
    }

    @Mutation(returns => Merchants)
    async deleteMerchant(@Args('cif') cif: string, @Context() context: any) {
        const jwtToken = exportJwtTokenFromRequest(context);
        return await this.merchantService.deleteMerchant(cif, jwtToken);
    }
}