import { Injectable } from '@nestjs/common';
import { CreatePayer } from './models/payer.model';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PayersService {
    private serviceUrl: string;

    constructor(private configService: ConfigService) {
        this.serviceUrl = this.configService.get<string>('serviceUrl');
    }

    async getPayers(page: number = 1, limit: number = 5, jwtToken?: string, search?: string) {
        try {
            const headers = {
                ...(jwtToken && { Authorization: jwtToken })
            };
            const payersList = await ( await fetch(`${this.serviceUrl}/payers/auth/payers?page=${page}&limit=${limit}&search=${search}`, {
                headers: headers,
            }) ).json();
            if(!payersList.success) throw new Error(payersList.message);
            return payersList;
        } catch (error) {
            return error;
        }
    }
    
    async getTotalDept(cif: string, fullName: string, jwtToken?: string) {
        try {
            const headers = {
                ...(jwtToken && { Authorization: jwtToken })
            };
            const totalDept = await ( await fetch(`${this.serviceUrl}/payers/auths/totaldebt?cif=${cif}&fullName=${fullName}`, {
                headers: headers,
            }) ).json();
            if(!totalDept.success) throw new Error(totalDept.message);
            return totalDept;
        } catch (error) {
            return error;
        }
    }

    async createPayer(payer: CreatePayer, jwtToken?: string) {
        try {
            const headers = {
                'Content-Type': 'application/json',
                ...(jwtToken && { Authorization: jwtToken })
            };
            const payerCreated = await ( await fetch(`${this.serviceUrl}/payers/payers`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(payer)
            }) ).json();
    
            if(!payerCreated.success) throw new Error(payerCreated.message);
            return payerCreated;
        } catch (error) {
            return error;
        }
    }
}
