import { Controller, Get, Query } from '@nestjs/common';
import { BalanceService } from './balance.service';

interface BalanceArray {
  date: string;
  balance: number;
}

@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get()
  getTxn(
    @Query('userAddress') userAddress?: string,
    @Query('tokenAddress') tokenAddress?: string,
  ): Promise<BalanceArray[]> {
    return this.balanceService.getTxn(userAddress, tokenAddress);
  }
}
