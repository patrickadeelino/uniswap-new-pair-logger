# Pair Created Event Logger

This repository contains a script that listens for a `PairCreated` event on a Uniswap V2 factory contract and logs the address of the new token pair to a CSV file.

Note: Only pairs with WETH will be logged.

## Installation

1. Clone the repository to your local machine.
2. Install the required dependencies by running `npm install`.

## Usage

1. Copy `.env.example` to `.env`
2. Add your Alchemy API key to `ALCHEMY_PROVIDER_KEY` in .env 
3. Run the script by running `node index.js`.
4. Go to data.csv to see newly created WETH pairs in Uniswap V2.

## License

[MIT](https://choosealicense.com/licenses/mit/)
