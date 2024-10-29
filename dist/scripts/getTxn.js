"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTxn = void 0;
const axios_1 = require("axios");
const getTxn = async (address, userAddress, apiKey) => {
    const dailyBalances = {};
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
    const requestOptions = {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: data,
    };
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${apiKey}`;
    const axiosURL = `${baseURL}`;
    try {
        const response = await axios_1.default.post(axiosURL, data, requestOptions);
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
        const balanceArray = Object.entries(dailyBalances).map(([date, balance]) => ({ date, balance }));
        const totalBalance = balanceArray.reduce((acc, day) => acc + day.balance, 0);
        const reward = totalBalance / 100;
        return { balanceArray, reward };
    }
    catch (error) {
        console.log(error);
        throw new Error('Failed to fetch transaction data');
    }
};
exports.getTxn = getTxn;
//# sourceMappingURL=getTxn.js.map