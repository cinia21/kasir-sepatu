import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import Sidebar from "../components/sidebar";
import Preload from "../components/preload";

const Layout = () => {
    return (
        <>
        <div className="wrapper">
            <Preload/>
            <Header/>
            <Sidebar/>
        <div className="content-wrapper">{<Outlet/>}</div>
            <Footer/>
        </div>
        </>
    );
};

export default Layout;