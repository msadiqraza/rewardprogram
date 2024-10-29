import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getTxn } from 'src/utils/getTxn';

interface BalanceArray {
  date: string;
  balance: number;
}

@Injectable()
export class BalanceService {
  private apiKey: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('ALCHEMY_API_KEY');

    if (!this.apiKey) {
      throw new Error('Alchemy API key is missing');
    }

    console.log('apiKey:', this.apiKey);
  }

  async getTxn(
    userAddress?: string,
    tokenAddress?: string,
  ): Promise<BalanceArray[]> {
    const token = tokenAddress || '0xB64ef51C888972c908CFacf59B47C1AfBC0Ab8aC';
    const user = userAddress || '0xb64ef51c888972c908cfacf59b47c1afbc0ab8ac';

    const { balanceArray, reward } = await getTxn(token, user, this.apiKey);

    console.log('balanceArray', balanceArray, '\nreward', reward);
    return balanceArray;
  }
}
