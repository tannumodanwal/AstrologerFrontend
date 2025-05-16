// Check if astrologer is logged in
export const isAstrologerLoggedIn = () => {
    const data = localStorage.getItem("astrologerData");
    return data !== null;
  };
  
  // Save astrologer data to localStorage and execute callback (e.g., redirect)
  export const doAstrologerLogin = (data, next) => {
    localStorage.setItem("astrologerData", JSON.stringify({ astrologer: data }));
    if (typeof next === "function") {
      next();
    }
  };
   
  // Get current logged-in astrologer's details
  export const getCurrentAstrologer = () => {
    if (!isAstrologerLoggedIn()) return undefined;
  
    try {
      const data = JSON.parse(localStorage.getItem("astrologerData"));
      return data.astrologer;
    } catch (error) {
      console.error("Failed to parse astrologer data from localStorage:", error);
      return undefined;
    }
  };
  
  // Logout astrologer
  export const astrologerLogout = (next) => {
    localStorage.removeItem("astrologerData");
    if (typeof next === "function") {
      next();
    }
  };