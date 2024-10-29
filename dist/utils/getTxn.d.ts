interface DailyBalance {
    date: string;
    balance: number;
}
interface TxnResult {
    balanceArray: DailyBalance[];
    reward: number;
}
declare const getTxn: (address: string, userAddress: string, apiKey: string) => Promise<TxnResult>;
export { getTxn };
