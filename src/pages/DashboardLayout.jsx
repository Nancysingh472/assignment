import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { NavLink, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Sidebar */}
      <div
        className="bg-white border-end shadow-sm"
        style={{ width: collapsed ? '80px' : '240px', transition: 'width 0.3s' }}
      >
        {/* Sidebar Header */}
        <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
          <span className="fw-bold text-primary">
            {!collapsed && 'Admin Panel'}
          </span>
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => setCollapsed(!collapsed)}
          >
            ☰
          </button>
        </div>

        {/* Sidebar Menu */}
        <ul className="nav flex-column mt-3">
          <li className="nav-item px-3 mb-2">
            <NavLink to="/dashboard" className="nav-link text-dark fw-semibold">
              🏠 {!collapsed && 'Dashboard'}
            </NavLink>
          </li>

          <li className="nav-item px-3 mb-2">
            <NavLink to="/dashboard/users" className="nav-link text-dark fw-semibold">
              👥 {!collapsed && 'Users'}
            </NavLink>
          </li>

          <li className="nav-item px-3 mb-2">
            <NavLink to="/dashboard/upload" className="nav-link text-dark fw-semibold">
              📩 {!collapsed && 'File Upload'}
            </NavLink>
          </li>

          <li className="nav-item px-3 mb-2">
            <NavLink to="/dashboard/search" className="nav-link text-dark fw-semibold">
              📩 {!collapsed && 'Files'}
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1">
        {/* Top Header */}
        <div className="bg-white shadow-sm p-3 fw-semibold">
          Dashboard Overview
        </div>

        {/* 👇 YAHAN HAR PAGE AAYEGA */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
