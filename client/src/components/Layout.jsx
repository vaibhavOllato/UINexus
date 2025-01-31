import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Sidebar />
      <Header />
      <main style={{ marginLeft: 240, padding: '20px' }}>
        {children}
      </main>
    </>
  );
};

export default Layout;
