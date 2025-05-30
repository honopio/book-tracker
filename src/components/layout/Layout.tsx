import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Header onDrawerOpen={() => setDrawerOpen(true)} />
      <Sidebar open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <Outlet />
      <Footer />
    </>
  );
}
export default Layout;
