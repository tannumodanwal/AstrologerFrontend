import React from 'react';
import { useNavigate } from "react-router-dom"

const RechargePage = () => {

  const navigate = useNavigate();

  const rechargeOptions = [
    { amount: 50, bonus: 50 },
    { amount: 100, bonus: 100, popular: true },
    { amount: 200, bonus: 100 },
    { amount: 500, bonus: 250 },
    { amount: 1000, bonus: 50 },
    { amount: 2000, bonus: 200 },
    { amount: 3000, bonus: 300 },
    { amount: 4000, bonus: 480 },
    { amount: 8000, bonus: 960 },
    { amount: 15000, bonus: 2250 },
    { amount: 20000, bonus: 3000 },
    { amount: 50000, bonus: 10000 },
    { amount: 100000, bonus: 20000 }
  ];

  
  const handleRechargeClick = (amount) => {
    // jab kisi card pe click ho, payment page pe bhej do
    navigate("/Payment", { state: { amount } });
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2">Add Money to Wallet</h2>
        <p className="text-center text-gray-600 text-lg mb-6">Available balance: <span className="text-black font-bold text-2xl">₹ 0</span></p>    
        <h3 className="text-xl font-semibold mb-4">Popular Recharge</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {rechargeOptions.map((option, index) => (
            <div
              key={index}
              onClick={() => handleRechargeClick(option.amount)}
              className="border rounded-xl p-4 text-center cursor-pointer hover:shadow-md"   
            >
              <div className="text-xl font-bold">₹ {option.amount}</div>
              {option.popular && (
                <div className="text-sm text-white bg-orange-400 rounded-full px-2 py-0.5 mt-1 inline-block">
                  ★ Most Popular
                </div>
              )}
              <div className="mt-2 text-green-600 font-semibold">₹ {option.bonus} Extra</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RechargePage;
