import { Body, Controller, Delete, Get, HttpStatus, Next, Param, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { CustomValidationPipe } from './pipes/validation.pipe';
import { MerchantDto } from './dtos/merchant.dto';
import { MerchantService } from './merchant.service';
import { NextFunction, Response } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { UpdateMerchantDto } from './dtos/updateMerchant.dto';

@Controller('merchants')
@UseGuards(AuthGuard)
export class MerchantController {
    constructor( private merchantervice: MerchantService ) {}

    @Get()
    getMerchants() {
        return this.merchantervice.sendMerchantsArray();
    }

    @Post()
    createMerchant(@Body(new CustomValidationPipe())body: MerchantDto) {
        console.log(body);
        return this.merchantervice.addNewMerchant(body);
    }

    @Put("/:cif")
    updateMerchant(@Body(new CustomValidationPipe())body: UpdateMerchantDto, @Param('cif') cif: string) {
        return this.merchantervice.updateMerchantInfo(body, cif);
    } 

    @Delete()
    deleteMerchant(@Query('cif') cif: string) {
        console.log(cif);
        return this.merchantervice.deleteMerchant(cif);
    }
}
