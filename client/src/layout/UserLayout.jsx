import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/layoutComponents/Header";
import Footer from "../components/layoutComponents/Footer";

const UserLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer always at bottom */}
      <Footer />
    </div>
  );
};

export default UserLayout;
