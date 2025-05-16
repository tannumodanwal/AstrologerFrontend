import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Footer from './component/Footer'; 
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Homepage from './Homepage';
import ChatsWithAstrologer from './component/Astrologer/ChatsWithAstrologer';
import UserLogin from './component/User/UserLogin';
import UserRegistration from './component/User/UserRegistration'; 
import UserProfileInfo from './component/User/UserProfileInfo';
import AstrologerLogin from './component/Astrologer/AstrologerLogin';
import AstroProfile from './component/Astrologer/AstroProfile';
import EditDetailsAstro from './component/Astrologer/EditDetailsAstro';
import AstrologerRegistration  from './component/Astrologer/AstrologerRegistration';
import AdminDashboard from './component/Admin/AdminDashboard'
import AdminLogin from './component/Admin/AdminLogin'
import AstroManagement from './component/Admin/AstroManagement'
import MinimumBalanceModal from './component/Common/MinimumBalanceModal'
import RechargeModal from './component/Common/RechargeModal'
import Payment from './component/Common/Payment'
import ChatBox from './component/Chat/ChatBox';
import Message from './component/Chat/Message';
import MessageInput from './component/Chat/MessageInput';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar /> 
        
        <div className="flex-grow">
          <ToastContainer position='bottom-center' />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/chat" element={<ChatsWithAstrologer />} />
            
             {/* ✅ User Routes */}
             <Route path="/user/login" element={<UserLogin />} />
            <Route path="/user/signup" element={<UserRegistration />} />
            <Route path="/profile" element={<UserProfileInfo />} />

            {/* ✅ Astrologer Routes */}
            <Route path="/astrologer/login" element={<AstrologerLogin />} />
            <Route path="/astrologer/signup" element={<AstrologerRegistration />} />
            <Route path="/astroProfile" element={<AstroProfile />} />
            <Route path="/editProfile" element={<EditDetailsAstro />} />
            
            {/* ✅ Admin Routes */}
            <Route path="/AdminDashboard" element={<AdminDashboard />} />
            <Route path="/AdminLogin" element={<AdminLogin />} />
            <Route path="/AstroManagement" element={<AstroManagement />} />
            <Route path="/MinimumBalanceModal" element={<MinimumBalanceModal />} />
            <Route path="/RechargeModal" element={<RechargeModal />} />
            <Route path="/Payment" element={<Payment />} />
            <Route path="/ChatBox" element={<ChatBox />} />
            <Route path="/Message" element={<Message />} />
            <Route path="/MessageInput" element={<MessageInput />} />
            
          </Routes>
        </div>
        <Footer /> 
      </div>
    </Router>
  ); 
}

export default App;