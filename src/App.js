import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import OtpVerify from "./pages/OtpVerify";

import DashboardLayout from "./pages/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Search from "./pages/FileSearchPage";
import User from "./pages/User";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth pages (NO sidebar) */}
        <Route path="/" element={<Login />} />
        <Route path="/otp" element={<OtpVerify />} />

        {/* Protected / Layout pages */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<User />} />
          <Route path="upload" element={<Upload />} />
          <Route path="search" element={<Search />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
