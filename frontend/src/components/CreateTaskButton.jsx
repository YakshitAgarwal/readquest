import { createWalletClient } from "viem";
import { baseSepolia } from "viem/chains";
import { custom } from "viem";
import { parseEther } from "viem";

const CreateTaskButton = ({ loading, onPaymentSuccess }) => {
  const handlePayment = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask");
      return;
    }

    try {
      const walletClient = createWalletClient({
        chain: baseSepolia,
        transport: custom(window.ethereum),
      });

      const [address] = await walletClient.requestAddresses();

      if (!address) {
        throw new Error("No wallet address found");
      }

      const hash = await walletClient.sendTransaction({
        account: address,
        to: import.meta.env.VITE_WALLET_ADDRESS,
        value: parseEther("0.01"),
      });

      if (hash) {
        await onPaymentSuccess();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      type="button"
      disabled={loading}
      onClick={handlePayment}
      className="rounded-xl bg-black py-3 text-white cursor-pointer hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {loading ? "Creating..." : "Create Task"}
    </button>
  );
};

export default CreateTaskButton;
