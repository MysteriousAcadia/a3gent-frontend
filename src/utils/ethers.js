import { ethers } from "ethers";

export const getBalance = async (address) => {
  if (!address) {
    throw new Error("Address is required to get balance");
  }

  try {
    const provider = new ethers.JsonRpcProvider(
      "https://eth-sepolia.g.alchemy.com/v2/demo"
    );
    const balance = await provider.getBalance(address);
    console.log("Balance in wei:", balance.toString());
    return ethers.formatEther(balance);
  } catch (error) {
    console.error("Error fetching balance:", error);
    throw error;
  }
};
