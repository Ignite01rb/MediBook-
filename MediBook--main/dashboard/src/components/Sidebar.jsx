import React, { useContext, useState } from "react";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor, FaEye } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [show, setShow] = useState(false);

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/user/admin/logout", {
        withCredentials: true,
      });
      toast.success(res.data.message);
      setIsAuthenticated(false);
    } catch (err) {
      if (err.message === "Network Error" || !err.response) {
        console.warn("Backend down. Performing Mock Logout.");
        localStorage.removeItem("mock_admin_user");
        setIsAuthenticated(false);
        toast.success("Logged out successfully (Mock Mode)!");
      } else {
        toast.error(err.response?.data?.message || "Logout failed!");
      }
    }
  };

  const navigateTo = useNavigate();

  const gotoHomePage = () => {
    navigateTo("/");
    setShow(!show);
  };
  const gotoDoctorsPage = () => {
    navigateTo("/doctors");
    setShow(!show);
  };
  const gotoMessagesPage = () => {
    navigateTo("/messages");
    setShow(!show);
  };
  const gotoAddNewDoctor = () => {
    navigateTo("/doctor/addnew");
    setShow(!show);
  };
  const gotoAddNewAdmin = () => {
    navigateTo("/admin/addnew");
    setShow(!show);
  };

  return (
    <>
      <nav
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
        className={show ? "show sidebar" : "sidebar"}
      >
        <div className="links">
          <TiHome onClick={gotoHomePage} title="Dashboard Home" />
          <FaUserDoctor onClick={gotoDoctorsPage} title="Manage Doctors" />
          <MdAddModerator onClick={gotoAddNewAdmin} title="Add Admin" />
          <IoPersonAddSharp onClick={gotoAddNewDoctor} title="Add Doctor" />
          <AiFillMessage onClick={gotoMessagesPage} title="View Messages" />
          <FaEye onClick={() => window.open("http://localhost:5174/", "_blank")} title="View Patient Portal" />
          <RiLogoutBoxFill onClick={handleLogout} title="Logout" />
        </div>
      </nav>
      <div
        className="wrapper"
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
      >
        <GiHamburgerMenu className="hamburger" onClick={() => setShow(!show)} />
      </div>
    </>
  );
};

export default Sidebar;
