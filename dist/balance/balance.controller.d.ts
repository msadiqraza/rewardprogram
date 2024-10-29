import { BalanceService } from './balance.service';
interface BalanceArray {
    date: string;
    balance: number;
}
export declare class BalanceController {
    private readonly balanceService;
    constructor(balanceService: BalanceService);
    getTxn(userAddress?: string, tokenAddress?: string): Promise<BalanceArray[]>;
}
export {};
