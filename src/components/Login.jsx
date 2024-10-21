import { useState, useContext } from 'react';
import { Navigate } from  "react-router-dom";
import { NotesContext } from "../contexts/NotesContext";

const Web3Login = () => {
  const { account, setAccount } = useContext(NotesContext);
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        setLoading(true);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Error connecting wallet", error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("MetaMask is not installed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md text-center">
        <h2 className="text-3xl font-bold mb-6">Connect to My Private Notes</h2>

        {!account ? (
          <button
            onClick={connectWallet}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 ease-in-out"
            disabled={loading}
          >
            {loading ? "Connecting..." : "Connect Wallet"}
          </button>
        ) : (
          <Navigate to="/homepage" />
        )}
      </div>
    </div>
  );
};


export default Web3Login;
