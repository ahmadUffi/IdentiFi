import { ethers } from "ethers";
import identifi from "./Identifi.json";

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;
const contractAbi = identifi.abi;

export const contract = async () => {
  console.log("contract abi:", contractAbi);
  console.log("contract address:", contractAddress);
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
    signer,
  );

  return contractReader;
};
