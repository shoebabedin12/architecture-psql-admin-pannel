import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SideNav from "../Header/SideNav";

const Layout = () => {
  return (
    <>
      <Header />
      <SideNav />
      <Outlet />
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Layout;
