import { Inject, Injectable } from '@nestjs/common';
import { CreatePayerDto } from './dtos/create-payer.dto'; 
import { PayersMongoRepository } from './payers.repository';

@Injectable()
export class PayersService {

    constructor(private repo: PayersMongoRepository ) {}
    createPayer(payer: CreatePayerDto) {
        return this.repo.createPayer(payer);
    }

    getPayers(page: number, limit: number, search?: string) {
        return this.repo.getPayersList(page, limit, search);
    }

    getTotalDept(cif: string, fullName: string) {
        return this.repo.getTotalDept(cif, fullName);
    }

}
