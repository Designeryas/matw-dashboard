import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
// import NFTMarketplace from "views/admin/marketplace";
// import Profile from "views/admin/profile";
// import DataTables from "views/admin/tables";
// import RTLDefault from "views/rtl/default";

// Auth Imports
// import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdBarChart,
  MdHome,
  // MdOutlineShoppingCart,
  // MdBarChart,
  // MdPerson,
  // MdLock,
  // MdPeople
} from "react-icons/md";
import Reports from "views/admin/reports";
import QurbanReports from "views/admin/reportsQurban";
import ZohoReports from "views/admin/zoho";

const routes = [
  {
    name: "Dashboard",
    layout: "/",
    path: "dashboard",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Reports",
    layout: "/",
    path: "reports",
    icon: <MdBarChart className="h-6 w-6" />,
    component: <Reports />,
    secondary: true,
  },
  {
    name: "Qurban",
    layout: "/",
    path: "qurban",
    icon: <MdBarChart className="h-6 w-6" />,
    component: <QurbanReports />,
    secondary: true,
  },
  {
    name: "Qurban List",
    layout: "/",
    path: "list",
    icon: <MdBarChart className="h-6 w-6" />,
    component: <QurbanReports />,
    secondary: true,
  },
  {
    name: "Zoho",
    layout: "/",
    path: "zoho",
    icon: <MdBarChart className="h-6 w-6" />,
    component: <ZohoReports />,
    secondary: true,
  },
  // {
  //   name: "Reports",
  //   layout: "/admin",
  //   path: "nft-marketplace",
  //   icon: <MdBarChart className="h-6 w-6" />,
  //   component: <NFTMarketplace />,
  //   secondary: true,
  // },
  // {
  //   name: "Users",
  //   layout: "/admin",
  //   icon: <MdPeople className="h-6 w-6" />,
  //   path: "data-tables",
  //   component: <DataTables />,
  // },
  // {
  //   name: "Profile",
  //   layout: "/admin",
  //   path: "profile",
  //   icon: <MdPerson className="h-6 w-6" />,
  //   component: <Profile />,
  // },
  // {
  //   name: "Sign In",
  //   layout: "/auth",
  //   path: "sign-in",
  //   icon: <MdLock className="h-6 w-6" />,
  //   component: <SignIn />,
  // },
  // {
  //   name: "RTL Admin",
  //   layout: "/rtl",
  //   path: "rtl",
  //   icon: <MdHome className="h-6 w-6" />,
  //   component: <RTLDefault />,
  // },
];
export default routes;
