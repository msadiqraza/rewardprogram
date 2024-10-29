import axios, { AxiosRequestConfig } from 'axios';

// types for transaction data
interface Transaction {
  from: string;
  metadata: {
    blockTimestamp: string;
  };
  value: number;
}

interface ApiResponse {
  result: {
    transfers: Transaction[];
  };
}

interface DailyBalance {
  date: string;
  balance: number;
}

interface TxnResult {
  balanceArray: DailyBalance[];
  reward: number;
}

// Update the getTxn function with TypeScript types
const getTxn = async (
  address: string,
  userAddress: string,
  apiKey: string,
): Promise<TxnResult> => {
  const dailyBalances: Record<string, number> = {};
  const maxCount = '0x3e8';

  const data = JSON.stringify({
    jsonrpc: '2.0',
    id: 0,
    method: 'alchemy_getAssetTransfers',
    params: [
      {
        fromBlock: '0x0',
        toBlock: 'latest',
        fromAddress: address,
        category: ['external', 'internal', 'erc20', 'specialnft'],
        order: 'asc',
        maxCount: maxCount,
        withMetadata: true,
        excludeZeroValue: true,
      },
    ],
  });

  const requestOptions: AxiosRequestConfig = {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    data: data,
  };

  const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}`;
  const axiosURL = `${baseURL}`;
  try {
    const response = await axios.post<ApiResponse>(
      axiosURL,
      data,
      requestOptions,
    );
    const transfers = response.data.result.transfers;

    const total = Number(maxCount);

    for (let i = 0; i < total; i++) {
      const transaction = transfers[i];
      const date = new Date(transaction.metadata.blockTimestamp)
        .toISOString()
        .split('T')[0];

      if (transaction.from === userAddress) {
        if (!dailyBalances[date]) {
          dailyBalances[date] = 0;
        }
        dailyBalances[date] += transaction.value;
      }
    }

    const balanceArray = Object.entries(dailyBalances).map(
      ([date, balance]) => ({ date, balance }),
    );

    // Calculate reward
    const totalBalance = balanceArray.reduce(
      (acc, day) => acc + day.balance,
      0,
    );
    const reward = totalBalance / 100;

    return { balanceArray, reward };
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch transaction data');
  }
};

export { getTxn };
