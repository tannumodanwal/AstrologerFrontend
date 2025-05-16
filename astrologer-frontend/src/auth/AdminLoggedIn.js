


// Check if user is logged in
{/* Ye check karta hai ki localStorage me data present hai ya nahi.
  Agar hai to true return karega → setLogin(true) ho jaayega.*/}

  export const isAdminLoggedIn = () => {
    const data = localStorage.getItem("data");
    return data !== null;
  };
  
  // Save user data to localStorage and execute callback (e.g., redirect)
  
  {/*ye data ko local Storage me save krta hai*/}
  export const doAdminLogin = (data, next) => {
    localStorage.setItem("data", JSON.stringify({ user: data }));
   // console.log("User data from localStorage:", JSON.parse(localStorage.getItem("data")));
    if (typeof next === "function") {
      next();
    }
  };
  
  
  // Get current logged-in user's details
  export const getCurrentAdmin = () => {
    if (!isAdminLoggedIn()) return undefined;
  
    try {
      const data = JSON.parse(localStorage.getItem("data"));
      return data.user; // 👈 Yeh return karo, data.user
    } catch (error) {
      console.error("Failed to parse user data from localStorage:", error);
      return undefined;
    }
  }; 
  
  
  
  // Logout user
  export const Adminlogout = (next) => {
    localStorage.removeItem("data");
    if (typeof next === "function") {
      next(); // callback function (e.g., navigate("/"))
    }
  };