import { ConfigService } from '@nestjs/config';
interface BalanceArray {
    date: string;
    balance: number;
}
export declare class BalanceService {
    private configService;
    private apiKey;
    constructor(configService: ConfigService);
    getTxn(userAddress?: string, tokenAddress?: string): Promise<BalanceArray[]>;
}
export {};
