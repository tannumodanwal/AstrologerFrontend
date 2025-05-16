import React, { useState } from 'react';
import RechargeModal from './RechargeModal';
import { useNavigate } from 'react-router-dom';

function MinimumBalanceModal({ amount, astrologer, onClose }) {

  const navigate = useNavigate();
  const [showRecharge, setShowRecharge] = useState(false);

  const handleRechargeClick = () => {
    onClose(); // Pehle ye modal close karo
    navigate("/RechargeModal"); // Fir redirect karo recharge page pe
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
  <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-sm text-center">
    <p className="text-base text-gray-800 leading-relaxed">
      Minimum balance of 2 minutes (₹ {amount}) <br />
      is required to start chat with <b>{astrologer}</b>
    </p>
    <div className="mt-6 flex justify-center ">
     <div className="mt-4 flex justify-around gap-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={handleRechargeClick} className="px-4 py-2 bg-green-500 text-white rounded">Recharge</button>
        </div>
    </div>
  </div>
</div>



      {showRecharge && <RechargeModal onClose={onClose} />}
    </>
  );
}

export default MinimumBalanceModal;
