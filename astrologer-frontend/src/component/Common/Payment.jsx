import { useLocation } from "react-router-dom";
import axios from "axios";

import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {

  const navigate = useNavigate();
  const { state } = useLocation();
  const amount = state?.amount || 0;
  const gst = (amount * 0.18).toFixed(2);
  const total = (amount + parseFloat(gst)).toFixed(2);

  const handlePay = async () => {
    try {
      const userId = 1; // ya current logged in user ka ID
      await axios.post(`http://localhost:9999/api/wallet/recharge`, {
        userId,
        amount: parseFloat(total)
        
      });
      alert("Recharge successful!"); 
      navigate("/ChatBox");
    } catch (error) {
      alert("Recharge failed!");
    }
  };

  return (
    <div className="max-w-md mx-auto border p-4 mt-10 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-center mb-4">Payment Details</h2>
      <div className="space-y-2 mb-6">
        <div className="flex justify-between">
          <span>Recharge Amount</span>
          <span>₹{amount}</span>
        </div>
        <div className="flex justify-between">
          <span>GST @18%</span>
          <span>₹{gst}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Total Amount</span>
          <span>₹{total}</span>
        </div>
      </div>
      <div className="flex justify-center mb-4">
        <img src="/wallet.webp" alt="Wallet" className="h-20" />
      </div>
      <button
        onClick={handlePay}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Pay
      </button>
    </div>
  );
};

export default PaymentPage;
