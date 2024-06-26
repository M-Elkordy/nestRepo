import { Controller, Post, Get, UseGuards, Body, Query } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreatePayerDto } from './dtos/create-payer.dto'; 
import { PayersService } from './payers.service';

@Controller('payers')
export class PayersController {
    
    constructor(private payersService: PayersService) {}

    @UseGuards(AuthGuard)
    @Post('/payers')
    createPayer(@Body() body: CreatePayerDto) {
        this.payersService.createPayer(body);
    }

    @UseGuards(AuthGuard)
    @Get('auth/payers')
    getPayers(@Query('page') page: number, @Query('limit') limit: number, @Query('search') search?: string) {
        return this.payersService.getPayers(page, limit, search);
    }

    @UseGuards(AuthGuard)
    @Get('/auths/totaldebt')
    getTotalDept(@Query('cif') cif: string, @Query('fullName') fullName: string) {
        console.log(`${cif}, ${fullName}`);
        return this.payersService.getTotalDept(cif, fullName);
    }
}
