import { ethers } from "ethers";
import identifi from "./Identifi.json";
import * as dotenv from "dotenv";
dotenv.config();

const contractAddress = process.env.CONTRACTADDRESS as string;
const contractAbi = identifi.abi;

// please write me ignore eslint any

export const contract = async () => {
  if (!window.ethereum) {
    throw new Error("Ethereum provider not found");
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window;

  if (!ethereum) {
    throw new Error("MetaMask is not installed");
  }

  const signer = provider.getSigner();
  const contractReader = new ethers.Contract(
    contractAddress,
    contractAbi,
    signer
  );

  return contractReader;
};
