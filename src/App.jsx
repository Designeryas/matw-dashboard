import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import RtlLayout from "layouts/rtl";
// import AdminLayout from "layouts/admin";
import Dashboard from "views/admin/default";
import Reports from "views/admin/reports";
import QurbanReports from "views/admin/reportsQurban";
import ZohoReports from "views/admin/zoho";
import QurbanList from "views/admin/qurbanTable";
// import AuthLayout from "layouts/auth";
const App = () => {
  return (
    <Routes>
      {/* <Route path="auth/*" element={<AuthLayout />} /> */}
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/qurban" element={<QurbanReports />} />
      <Route path="/zoho" element={<ZohoReports />} />
      <Route path="/list" element={<QurbanList />} />
      {/* <Route path="admin/*" element={<AdminLayout />} /> */}
      <Route path="rtl/*" element={<RtlLayout />} />
      <Route path="/" element={<Navigate to="/admin" replace />} />
      {/* <Route path="/" element={<Navigate to="/auth" replace />} /> */}
    </Routes>
  );
};

export default App;
