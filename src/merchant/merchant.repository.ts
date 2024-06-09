import { readFileSync, writeFileSync } from "fs";
import * as fs from 'fs';
import { UserDto } from "./dtos/user.dto";
import { Injectable } from "@nestjs/common";


export interface DataSource {
    getMerchants: () => UserDto[];
    addMerchant: (data: UserDto) => void;
    updateMerchat: (merchantUser: UserDto, userCif: string) => UserDto[];
    deleteMerchant: (userCif: string) => UserDto[];
}

@Injectable()
export class JsonFileRepository implements DataSource {
    constructor(private filePath: string) {}

    getMerchants() : UserDto[] {
        try {
            const data = readFileSync(this.filePath, 'utf-8');
            if(data) {
                const jsonData: UserDto[] = JSON.parse(data) as UserDto[];
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

    addMerchant(data: UserDto) : void {
        let allData = this.getMerchants();
        allData.push(data);
        fs.writeFile(this.filePath, JSON.stringify(allData, null, 2), err => {
            err ? console.log(err) : console.log("file written successfully");
        });
    };

    updateMerchat(merchantUser: UserDto, userCif: string): UserDto[] {
        try {
            let data = this.getMerchants();
            const newData = data.filter(user => user.cif !== userCif);
            merchantUser.cif = userCif;
            const updatedData = [...newData, merchantUser];
            writeFileSync(this.filePath, JSON.stringify(updatedData, null, 2));
            return updatedData;
        } catch (error) {
            console.log(error);
        }
    };
    
    deleteMerchant(userCif: string): UserDto[] {
        let data = this.getMerchants();
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