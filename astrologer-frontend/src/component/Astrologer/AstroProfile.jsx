import React, { useState } from 'react';

const AstroProfile = () => {
  const [chatNotification, setChatNotification] = useState(true);
  const [liveNotification, setLiveNotification] = useState(true);

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <h2 className="text-3xl font-semibold text-center mb-10">Profile Settings</h2>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Notifications Box */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Notifications</h3>
          <div className="flex justify-between items-center mb-3">
            <span>Astromall chat</span>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={chatNotification}
                onChange={() => setChatNotification(!chatNotification)}
              />
              <div className="w-11 h-6 bg-yellow-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:left-[2px] after:top-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all relative"></div>
            </label>
          </div>

          <div className="flex justify-between items-center">
            <span>Live Events</span>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={liveNotification}
                onChange={() => setLiveNotification(!liveNotification)}
              />
              <div className="w-11 h-6 bg-yellow-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:left-[2px] after:top-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all relative"></div>
            </label>
          </div>
        </div>

        {/* Language Box */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">My Language</h3>
          <p className="text-green-600 cursor-pointer hover:underline">Edit your languages</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="max-w-5xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 px-2">
        <button className="bg-white text-black shadow border py-2 rounded-lg hover:bg-gray-100">
          ⋮ Edit Profile
        </button>

        <button className="bg-white text-red-600 shadow border py-2 rounded-lg hover:bg-red-100">
          🔁 Logout from all other devices
        </button>

        <button className="bg-white text-red-600 shadow border py-2 rounded-lg hover:bg-red-100">
          🗑️ Delete My Account
        </button>
      </div>
    </div>
  );
};

export default AstroProfile;
