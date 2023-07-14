import { Controller, Get, Query } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';

@Controller('currencies')
export class CurrenciesController {

    constructor(
        private readonly currenciesService: CurrenciesService,
    ) {}

    @Get('currentPrice')
    async getCurrentPrice(
        @Query('from') from: string,
        @Query('to') to: string
    ): Promise<number> {
        return await this.currenciesService.getCurrentPrice(from, to);
    }

}
