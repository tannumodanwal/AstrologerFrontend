import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const adminId = 1;
  const [admin, setAdmin] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [astroCount, setAstroCount] = useState(0);
  const [showAstroNotification, setShowAstroNotification] = useState(false);

  // Admin data + Image
  const fetchAdmin = async () => {
    try {
      const response = await axios.get(`http://localhost:9999/api/admin/${adminId}`);
      setAdmin(response.data);
      if (response.data.image) {
        setImageUrl(`http://localhost:9999/images/${response.data.image}`);
      }
    } catch (error) {
      console.error("Failed to fetch admin", error);
    }
  };

  // Unverified astrologer count
  const fetchUnverifiedAstrologerCount = async () => {
    try {
      const response = await axios.get("http://localhost:9999/api/astrologers/admin/pending-count");
      setAstroCount(response.data);
      setShowAstroNotification(response.data > 0);
    } catch (error) {
      console.error("Failed to fetch unverified astrologer count", error);
    }
  };

  useEffect(() => {
    fetchAdmin();
    fetchUnverifiedAstrologerCount();

    const handleFocus = () => {
      fetchUnverifiedAstrologerCount();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [adminId]);

  // Image Upload
  const handleImageUpload = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      await axios.post(`http://localhost:9999/api/admin/${adminId}/upload-image`, formData);
      const response = await axios.get(`http://localhost:9999/api/admin/${adminId}`);
      setAdmin(response.data);
      setImageUrl(`http://localhost:9999/images/${response.data.image}`);
    } catch (error) {
      console.error("Image upload failed", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-200 p-6 flex flex-col items-center">
        <div className="relative mb-4">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover shadow-md"
            />
          ) : (
            <div className="w-24 h-24 bg-blue-500 text-white flex items-center justify-center text-3xl rounded-full shadow-md">
              {admin?.name?.charAt(0)?.toUpperCase() || "A"}
            </div>
          )}
          <label className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow cursor-pointer">
            <input
              type="file"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              className="hidden"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-yellow-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v9m0 0l-3-3m3 3l3-3M16 8V4a2 2 0 00-2-2H10a2 2 0 00-2 2v4"
              />
            </svg>
          </label>
        </div>
        <div className="text-xl font-bold mb-2">{admin?.name || "Admin"}</div>
        <button
          onClick={handleImageUpload}
          className="mb-6 bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600 text-sm"
        >
          Upload
        </button>

        {/* Sidebar Links */}
        <nav className="flex flex-col space-y-4 mt-4 w-full text-center">
          <a href="#" className="hover:text-yellow-600 font-medium">Dashboard</a>
          <a href="#" className="hover:text-yellow-600 font-medium">Users</a>

          {/* Astrologers with badge */}
          <div className="relative inline-block self-center">
            <div
              className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition duration-200 cursor-pointer"
              onClick={() => setShowAstroNotification(false)}
            >
              {showAstroNotification && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {astroCount}
                </span>
              )}
              <a href="/AstroManagement" className="font-medium block text-center">
                Astrologers
              </a>
            </div>
          </div>

          <a href="#" className="hover:text-yellow-600 font-medium">Settings</a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-start p-10 space-y-6">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Admin Dashboard!</h1>
        <p className="text-gray-600">Use the sidebar to manage the platform.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
