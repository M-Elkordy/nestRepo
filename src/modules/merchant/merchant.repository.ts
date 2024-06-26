import { readFileSync, writeFileSync } from "fs";
import * as fs from 'fs';
import { MerchantDto } from "./dtos/merchant.dto";
import { Injectable } from "@nestjs/common";
import { merchantDocumnet } from "./entities/merchant.schema";


export interface DataSource {
    getMerchants: () => Promise<merchantDocumnet[]>;
    addMerchant: (data: MerchantDto) => Promise<void>;
    updateMerchat: (merchantUser: MerchantDto, userCif: string) => Promise<merchantDocumnet[]>;
    deleteMerchant: (userCif: string) => Promise<merchantDocumnet[]>;
}

@Injectable()
export class JsonFileRepository {
    constructor(private filePath: string) {}

    async getMerchants() : Promise<MerchantDto[]> {
        try {
            const data = readFileSync(this.filePath, 'utf-8');
            console.log(data);
            if(data) {
                const jsonData: MerchantDto[] = JSON.parse(data) as MerchantDto[];
                return jsonData;
            } else {
                return [];
            }
        } catch (error) {
            fs.writeFile(this.filePath, '', err => {
                if(err) {
                    console.log(err);
                } else {
                    console.log("file written successfully");
                    return [];
                }
            })
        }
    };

    async addMerchant(data: MerchantDto) : Promise<void> {
        let allData = await this.getMerchants();
        allData.push(data);
        fs.writeFile(this.filePath, JSON.stringify(allData, null, 2), err => {
            err ? console.log(err) : console.log("file written successfully");
        });
    };

    async updateMerchat(merchantUser: MerchantDto, userCif: string): Promise<MerchantDto[]> {
        try {
            let data = await this.getMerchants();
            const newData = data.filter(user => user.cif !== userCif);
            merchantUser.cif = userCif;
            const updatedData = [...newData, merchantUser];
            writeFileSync(this.filePath, JSON.stringify(updatedData, null, 2));
            return updatedData;
        } catch (error) {
            console.log(error);
        }
    };
    
    async deleteMerchant(userCif: string): Promise<MerchantDto[]> {
        let data = await this.getMerchants();
        if(data.length > 0) {
            const newData = data.filter(user => user.cif !== userCif);
            fs.writeFile(this.filePath, JSON.stringify(newData, null, 2), err => {
                err ? console.log(err) : console.log("file written successfully");
            })
            return newData; 
        }
        return [];
    };
}