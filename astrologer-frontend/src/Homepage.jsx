import React from 'react';
import Navbar from './component/Navbar';
import { Link } from 'react-router-dom';



const Homepage = () => {
 
  return (
    <div className="font-sans bg-gradient-to-b from-white to-black min-h-screen text-center">

      {/* Navbar */}

      <Navbar />
   
      <section className="flex flex-col md:flex-row justify-center items-center text-black bg-gradient-to-r from-orange-300 to-yellow-100 py-10 px-6">
       
        <div className="md:w-1/2 text-left">
          <h2 className="text-2xl md:text-4xl font-bold mb-2">Confused About Your Career?</h2>
          <p className="text-lg md:text-xl mb-4 text-gray-800">
            Let the stars show you the way.
          </p>
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Talk to an Expert Astrologer
          </h1>
          <button className="bg-black text-white px-6 py-2 rounded-full text-lg font-semibold">
            👉 Chat Now
          </button>
        </div>
        <img
          src="https://www.astrocamp.com/images/astrologer/2x/ph-24.jpg"
          alt="Astrologer"
          className="w-70 mt-6 md:mt-0 md:ml-10"
        />

      </section>

      {/* Buttons Section */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white">
        <Link to="/chat-with-astrologer" className="bg-pink-100 p-4 rounded shadow text-center">
          <span role="img" aria-label="chat" className="text-3xl">💬</span>
          <p className="mt-2">Chat with Astrologer</p>
        </Link>

        <div className="bg-green-100 p-4 rounded shadow text-center">
          <span role="img" aria-label="call" className="text-3xl">📞</span>
          <p className="mt-2">Talk to Astrologer</p>
        </div>

        <div className="bg-blue-100 p-4 rounded shadow text-center">
          <span role="img" aria-label="shop" className="text-3xl">🛒</span>
          <p className="mt-2">Astromall Shop</p>
        </div>

        <div className="bg-orange-100 p-4 rounded shadow text-center">
          <span role="img" aria-label="pooja" className="text-3xl">🪔</span>
          <p className="mt-2">Book A Pooja</p>
        </div>
      </div>

      {/* Statistics Section */}

      <section className="bg-yellow-400 py-8 text-black">

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <span className="text-3xl font-bold">43,560+</span>
            <p className="text-sm">Total Astrologers</p>
          </div>

          <div>
            <span className="text-3xl font-bold">1326 Million</span>
            <p className="text-sm">Total Chat/Call Minutes</p>
          </div>

          <div>
            <span className="text-3xl font-bold">89.5 Million</span>
            <p className="text-sm">Total Customers</p>
          </div>
        </div>

      </section>

      <div className="bg-white text-center py-8 px-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Stars Hold the Answers</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Life is full of questions — love, career, health, and purpose. Let astrology bring you clarity and peace.
          With personalized guidance and deep insight, we help you align with your true path.
        </p>
      </div>
    </div>
  );
};

export default Homepage;