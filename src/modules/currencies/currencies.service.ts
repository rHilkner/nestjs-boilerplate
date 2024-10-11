import { Injectable } from '@nestjs/common';
import { HttpService } from '../http/http.service';

@Injectable()
export class CurrenciesService {

    constructor(
        private readonly httpService: HttpService,
    ) {}

    async getCurrentPrice(fromCurrency = 'USD', toCurrency= 'USD'): Promise<number> {
        try {
            const response = await this.httpService.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
            return response.data.rates[toCurrency];
        } catch (error) {
            console.error(error);
            throw new Error('Failed to fetch exchange rate');
        }
    }
}
