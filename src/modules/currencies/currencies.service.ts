import { Injectable } from '@nestjs/common'
import { HttpService } from '../http/http.service'
import { z } from 'zod'

const CurrencyCodeSchema = z.string().length(3).regex(/^[A-Z]{3}$/)

const ExchangeRateResponseSchema = z.object({
  base: z.string(),
  date: z.string(),
  rates: z.record(z.string(), z.number()),
})

@Injectable()
export class CurrenciesService {
  constructor(private readonly httpService: HttpService) {
  }

  async getCurrentPrice(
    fromCurrency = 'USD',
    toCurrency = 'USD',
  ): Promise<number> {
    try {
      // Validate the currency codes
      CurrencyCodeSchema.parse(fromCurrency)
      CurrencyCodeSchema.parse(toCurrency)

      const response = await this.httpService.get(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`,
      )

      // Validate the response data
      const parsedData = ExchangeRateResponseSchema.parse(response.data)

      // Get the exchange rate
      const rate = parsedData.rates[toCurrency]
      if (rate === undefined) {
        throw new Error(`Exchange rate not found for currency ${toCurrency}`)
      }

      return rate
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Validation error:', error.errors)
        throw new Error('Invalid data received from exchange rate API')
      } else {
        console.error('Error fetching exchange rate:', error)
        throw new Error('Failed to fetch exchange rate')
      }
    }
  }
}
