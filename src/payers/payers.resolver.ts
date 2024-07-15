import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { CreatePayer, Payer, Payers, TotalDeptReturn } from './models/payer.model';
import { PayersService } from './payers.service';
import { exportJwtTokenFromRequest } from 'src/helpers/jwt-token.helper';

@Resolver()
export class PayersResolver {
    constructor(private payersService: PayersService) {}

    @Query(returns => Payers)
    async getPayers(
        @Args('page') page: number, 
        @Args('limit') limit: number,
        @Context() context: any,
        @Args('search') search?: string
    ) {
        const jwtToken = exportJwtTokenFromRequest(context);
        return await this.payersService.getPayers(page, limit, jwtToken, search); 
    }

    @Query(returns => TotalDeptReturn)
    async getTotalDept(
        @Args('cif') cif: string, 
        @Args('fullName') fullName: string,
        @Context() context: any,
    ) {
        const jwtToken = exportJwtTokenFromRequest(context);
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
