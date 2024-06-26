import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { MerchantDto } from './dtos/merchant.dto';
import { DataSource } from './merchant.repository';


@Injectable()
export class MerchantService {
    constructor(
        @Inject("DataSource") private repo: DataSource
    ) {}

    async doesCifExists(cif: string): Promise<boolean> {
        const data = await this.repo.getMerchants();
        if(data.length === 0) return false;
        const foundData = data.some(obj => obj.cif === cif);
        return foundData;
    }

    sendMerchantsArray() {
        const merchants = this.repo.getMerchants();
        return merchants;
    }

    async addNewMerchant(body: MerchantDto) {
        const cifFound = await this.doesCifExists(body.cif);
        console.log(cifFound);
        if(cifFound) throw new BadRequestException("cif already found");
        this.repo.addMerchant(body);
        return body;    
    }

    async updateMerchantInfo(body: MerchantDto, cif: string) {
        const cifFound = await this.doesCifExists(cif);
        if(!cifFound) throw new BadRequestException("cif entererd does not exist!");
        this.repo.updateMerchat(body, cif);
    }

    async deleteMerchant(cif: string) {
        const cifFound = await this.doesCifExists(cif);
        if(!cifFound) throw new BadRequestException("cif entererd does not exist!");
        return this.repo.deleteMerchant(cif);
    }
}
