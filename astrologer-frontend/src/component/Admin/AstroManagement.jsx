import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Step 1

const AstroManagement = () => {
  const [astrologers, setAstrologers] = useState([]);
  const navigate = useNavigate(); // ✅ Step 2

  const fetchAstrologers = async () => {
    try {
      const response = await axios.get("http://localhost:9999/api/astrologers");
      setAstrologers(response.data);
    } catch (error) {
      console.error("Failed to fetch astrologers", error);
    }
  };

  useEffect(() => {
    fetchAstrologers();
  }, []);

  const verifyAstrologer = async (id) => {
    try {
      await axios.put(`http://localhost:9999/api/admin/verify-astrologer/${id}`);
      fetchAstrologers();
    } catch (error) {
      console.error("Failed to verify astrologer", error);
    }
  };

  return (
    <div className="p-10">
      {/* ✅ Back to Dashboard Button */}
      <button
        onClick={() => navigate("/adminDashboard")}
        className="mb-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        ← Back to Dashboard
      </button>

      <h2 className="text-2xl font-bold mb-6">All Astrologers</h2>
      {astrologers.length === 0 ? (
        <p>No astrologers found.</p>
      ) : (
        <table className="w-full text-left border border-gray-300 bg-white shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {astrologers.map((astro) => (
              <tr key={astro.id}>
                <td className="p-2 border">{astro.id}</td>
                <td className="p-2 border">{astro.name}</td>
                <td className="p-2 border">{astro.email}</td>
                <td className="p-2 border">{astro.contactNumber}</td>
                <td className="p-2 border">{astro.status}</td>
                <td className="p-2 border">
                  {astro.status === "PENDING" ? (
                    <button
                      onClick={() => verifyAstrologer(astro.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Verify
                    </button>
                  ) : (
                    <span className="text-green-600 font-semibold">Approved</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AstroManagement;
