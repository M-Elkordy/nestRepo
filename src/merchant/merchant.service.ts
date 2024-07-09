import { Injectable } from '@nestjs/common';
import { serviceUrl } from 'src/config/config';

@Injectable()
export class MerchantService {
    getMerchants() {
        return fetch(`${serviceUrl}/getMerchants`);
    }
}
