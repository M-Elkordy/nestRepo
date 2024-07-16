import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { CreatePayer, GetPayersInput, GetTotalDeptInput, Payer, Payers, TotalDeptReturn } from './models/payer.model';
import { PayersService } from './payers.service';
import { exportJwtTokenFromRequest } from 'src/helpers/jwt-token.helper';

@Resolver()
export class PayersResolver {
    constructor(private payersService: PayersService) {}

    @Query(returns => Payers)
    async getPayers(
        @Args('getPayersInput') getPayersInput: GetPayersInput, 
        @Context() context: any,
    ) {
        const { page, limit, search } = getPayersInput;
        const jwtToken = exportJwtTokenFromRequest(context);
        return await this.payersService.getPayers(page, limit, jwtToken, search); 
    }

    @Query(returns => TotalDeptReturn)
    async getTotalDept(
        @Args('getTotalDeptInput') getTotalDeptInput: GetTotalDeptInput, 
        @Context() context: any,
    ) {
        const jwtToken = exportJwtTokenFromRequest(context);
        const { cif, fullName } = getTotalDeptInput;
        return await this.payersService.getTotalDept(cif, fullName, jwtToken);
    }

    @Mutation(returns => Payer)
    async createPayer(
        @Args('payer') payer: CreatePayer,
        @Context() context: any,
    ) {
        const jwtToken = exportJwtTokenFromRequest(context);
        return await this.payersService.createPayer(payer, jwtToken);
    }
}
