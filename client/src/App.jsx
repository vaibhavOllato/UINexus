// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./components/Dashboard";
// import Layout from "./components/Layout";  // Import Layout

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* Dashboard route wrapped inside Layout */}
//         <Route
//           path="/dashboard"
//           element={
//             <Layout>
//               <Dashboard />
//             </Layout>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "../src/index.css";  // Import global styles
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './components/Dashboard';
import DashboardLayout from './components/DashboardLayout';
import { AuthProvider } from './context/AuthContext';  // Import the AuthProvider
import CommitteeMember from './pages/CommitteeMember';
import Members from './pages/Members';
import AccountDashboard from './pages/Accounts/AccountDashboard';
import AddAmountDonation from './pages/Accounts/addAmountDonation';
import ShowAmountDetails from './pages/Accounts/ShowAmountDetails';
import SearchDonationByNmae from './pages/Accounts/SearchDonationByName';
import CustomTheme from './utils/CustomTheme';  // Import your custom theme
import { ThemeProvider } from '@mui/material/styles';  // Import ThemeProvider
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import BlogManager from './pages/BlogManager';
import { Create } from '@mui/icons-material';
import CreateBlog from './pages/blogs/CreateBlog';
import BlogTabs from './pages/blogs/BlogTabs';
import AllMembers from './pages/AllMembers';


function App() {
  return (
    <AuthProvider>
      {/* Wrap the entire application with ThemeProvider */}
      <ThemeProvider theme={CustomTheme}>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              }
            />
            <Route
              path="/committee"
              element={
                <DashboardLayout>
                  <CommitteeMember />
                </DashboardLayout>
              }
            />
            <Route
              path="/member"
              element={
                <DashboardLayout>
                  <Members />
                </DashboardLayout>
              }
            />
            <Route
              path="/account-dashboard"
              element={
                <DashboardLayout>
                  <AccountDashboard />
                </DashboardLayout>
              }
            />
            <Route
              path="/add-account"
              element={
                <DashboardLayout>
                  <AddAmountDonation />
                </DashboardLayout>
              }
            />
            <Route
              path="/show-account"
              element={
                <DashboardLayout>
                  <ShowAmountDetails />
                </DashboardLayout>
              }
            />
            <Route
              path="/search-account"
              element={
                <DashboardLayout>
                  <SearchDonationByNmae />
                </DashboardLayout>
              }
            />
             <Route
              path="/blog-create"
              element={
                <DashboardLayout>
                  <BlogTabs />
                </DashboardLayout>
              }
            />
             <Route
              path="/all-mmebers"
              element={
                <DashboardLayout>
                  <AllMembers />
                </DashboardLayout>
              }
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>

      <ToastContainer
        position="top-center" // Position: top-center to center the toast
        autoClose={3000} // Auto close in 3 seconds
        hideProgressBar // Hide the progress bar
        closeOnClick
        pauseOnHover
        draggable
      />

    </AuthProvider>
  );
}

export default App;

