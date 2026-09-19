import axios from "axios";
import { x402Client, wrapAxiosWithPayment } from "@x402/axios";
import { ExactEvmScheme } from "@x402/evm/exact/client";

import { createWalletClient, custom } from "viem";
import { baseSepolia } from "viem/chains";

const PayButton = ({ blogId, user, onUnlock }) => {
  const handlePayment = async () => {
    if (!user) {
      alert("Please login first");
      return;
    }

    if (!window.ethereum) {
      alert("Please install MetaMask");
      return;
    }

    try {
      // Create a connection to MetaMask
      const walletClient = createWalletClient({
        chain: baseSepolia,
        transport: custom(window.ethereum),
      });

      // Opens MetaMask if the wallet is not connected
      const [address] = await walletClient.requestAddresses();

      if (!address) {
        throw new Error("No wallet address found");
      }

      // Create the ClientEvmSigner required by x402
      const signer = {
        address,

        signTypedData: async ({ domain, types, primaryType, message }) => {
          return await walletClient.signTypedData({
            account: address,
            domain,
            types,
            primaryType,
            message,
          });
        },
      };

      // Create x402 client
      const client = new x402Client();

      // Register Exact EVM payment scheme
      client.register("eip155:*", new ExactEvmScheme(signer));

      // Create axios client with payment support
      const api = wrapAxiosWithPayment(
        axios.create({
          baseURL: "http://localhost:8000",

          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }),
        client,
      );

      console.log("Sending unlock request...");

      // x402 flow:
      // 1. Request goes to backend
      // 2. Backend returns 402
      // 3. x402 calls signer.signTypedData()
      // 4. MetaMask opens for signing
      // 5. Request is retried with payment
      const response = await api.post(`/api/blogs/${blogId}/unlock`, {});

      console.log("Response:", response.data);

      onUnlock();

      alert("Blog unlocked successfully!");
    } catch (error) {
      console.error(
        "Unlock error:",
        error.response?.data || error.message || error,
      );
    }
  };

  return (
    <button
      className="text-white bg-black px-6 py-3 rounded-2xl text-[20px] w-full cursor-pointer"
      onClick={handlePayment}
    >
      <p>Pay</p>
      <p>$0.005</p>
    </button>
  );
};

export default PayButton;
