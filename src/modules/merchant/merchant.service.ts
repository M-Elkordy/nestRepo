import { BadRequestException, Injectable, Next } from '@nestjs/common';
import { UserDto } from './dtos/user.dto';
import { JsonFileRepository } from './merchant.repository';
import { Request, Response, NextFunction } from 'express';


@Injectable()
export class MerchantService {
    constructor(private jsonfileRepo: JsonFileRepository) {}

    doesCifExists(cif: string): boolean {
        const data = this.jsonfileRepo.getMerchants() as UserDto[];
        if(data === undefined) return false;
        const foundData = data.some(obj => obj.cif === cif);
        return foundData;
    }

    sendMerchantsArray() {
        const merchants = this.jsonfileRepo.getMerchants();
        return merchants;
    }

    addNewMerchant(body: UserDto) {
        const cifFound = this.doesCifExists(body.cif);
        if(cifFound) throw new BadRequestException("cif already found");
        this.jsonfileRepo.addMerchant(body);
        return body;    
    }

    updateMerchantInfo(body: UserDto, cif: string) {
        const cifFound = this.doesCifExists(cif);
        if(!cifFound) throw new BadRequestException("cif entererd does not exist!");
        this.jsonfileRepo.updateMerchat(body, cif);
    }

    deleteMerchant(cif: string) {
        const cifFound = this.doesCifExists(cif);
        if(!cifFound) throw new BadRequestException("cif entererd does not exist!");
        return this.jsonfileRepo.deleteMerchant(cif);
    }
}
