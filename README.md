
# NestJS Balance Tracker

This project provides an API to track daily token transactions for a given user address on the Ethereum blockchain. Built with [NestJS](https://nestjs.com/), the project leverages [Alchemy’s API](https://docs.alchemy.com/reference/get-asset-transfers) to fetch and calculate transactions to determine rewards for users.

## Features

- **Balance Tracking API**: Accepts a user address and token address to fetch daily token transfer history.
- **Alchemy Integration**: Uses Alchemy's `get_assetTransfers` API to pull transaction data.
- **Daily Balance Calculation**: Aggregates transactions into a daily summary of balances for calculating rewards.

---

## Installation

1. **Clone the Repository**:

   ```bash
   git clone rewardprogram
   cd rewardprogram
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Environment Setup**:
   - Create a `.env` file in the root directory with the following:

     ```dotenv
     ALCHEMY_API_KEY=your_alchemy_api_key
     ```

4. **Run the Application**:

   ```bash
   npm run start
   ```

---

## API Documentation

### **Endpoint**: `/balance`

**Method**: `GET`

**Description**: Retrieves an array of transactions for a given user address and token address, filtered by the current day. Each transaction object contains:
- **date**: Date of the transaction.
- **balance**: Sum of token transfers (balance) for the day.

**Parameters**:

| Parameter     | Type   | Description                          |
|---------------|--------|--------------------------------------|
| `userAddress` | String | The Ethereum address of the user.   |
| `tokenAddress`| String | The address of the token contract.  |

**Example Request**:

```http
GET /balance?userAddress=0x123...&tokenAddress=0xabc...
```

**Example Response**:

```json
[
  {
    "date": "2024-10-28",
    "balance": 150.25
  },
  {
    "date": "2024-10-27",
    "balance": 300.00
  }
]
```

---

## Code Structure

- **`/src`**: Contains the main NestJS application files.
  - **`app.controller.ts`**: Defines the `GET /balance` endpoint.
  - **`app.service.ts`**: Implements the logic to fetch transaction data from Alchemy and process it into daily balances.
- **`/utils`**: Includes helper functions for date formatting and balance calculations.

---

## Project Workflow

1. **User Address and Token Address as Input**:
   - The API accepts `userAddress` and `tokenAddress` as query parameters.

2. **Alchemy API Integration**:
   - The service uses Alchemy’s `get_assetTransfers` function to retrieve transaction history filtered by `tokenAddress`.
  
3. **Daily Balance Calculation**:
   - For each day, the transactions are summed to produce a daily balance.
   - The result is an array of objects containing the date and balance for each day with transactions.

---

## Usage

This API is used as a backend service for a rewards program application, where the user’s daily transaction balance in a specific token is calculated to determine rewards.