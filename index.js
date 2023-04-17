import { ethers } from "ethers";
import fs from "fs";
import * as dotenv from "dotenv";
dotenv.config();

const addresses = {
  factory: process.env.ETHEREUM_UNISWAP_FACTORY_ADDRESS,
  WETH: process.env.ETHEREUM_WETH_ADDRESS,
};

const provider = new ethers.providers.WebSocketProvider(
  `${process.env.WEB_SOCKET_PROVIDER_URL}${process.env.ALCHEMY_PROVIDER_KEY}`
);
const factoryContract = new ethers.Contract(
  addresses.factory,
  [
    "event PairCreated(address indexed token0, address indexed token1, address pair, uint)",
  ],
  provider
);

factoryContract.on(
  "PairCreated",
  async (firstToken, secondToken, pairAddress) => {
    const WETH = addresses.WETH;
    let tokenIn, tokenOut;

    if (firstToken === WETH) {
      tokenIn = firstToken;
      tokenOut = secondToken;
    }

    if (secondToken === WETH) {
      tokenIn = secondToken;
      tokenOut = firstToken;
    }

    // If neither token is WETH, do nothing
    const neitherTokenIsWETH = typeof tokenIn === "undefined";
    if (neitherTokenIsWETH) {
      console.log(
        "None of the tokens are WETH, it won't be written to the csv file."
      );
      return;
    }

    // Write the token and pair address to a CSV file
    try {
      fs.appendFileSync("data.csv", `\n${tokenOut},${pairAddress}`);
      console.log(
        "A new pair with WETH has been created and stored in the csv file."
      );
    } catch (error) {
      console.error(`Error writing to file: ${error}`);
    }
  }
);
