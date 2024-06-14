import React, { useState } from "react";
import "../Components/layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import 'remixicon/fonts/remixicon.css';

//import { selectUser } from '../redux/userSlice';


function Layout({ children }) {

  const user = JSON.parse(localStorage.getItem('data'));

  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const userMenu = [
    {
      name: "Appointments",
      path: "/bookAppointments",
      icon: "ri-file-list-line",
    },
    {
      name: "BookedAppointments",
      path: "/appointmentsbooked",
      icon: "ri-bookmark-line",
    },
    {
      name: "Notifications",
      path: "/notifications",
      icon: "ri-notification-line",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-id-card-line"
    },
  ];

  const doctorMenu = [
    {
      name: "Home",
      path: "/doctor",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/doctor/appointments",
      icon: "ri-user-star-line",
    }

  ];

  const adminMenu = [
    {
      name: "Home",
      path: "/admin",
      icon: "ri-home-line",
    },
    {
      name: "Users",
      path: "/admin/userLists",
      icon: "ri-user-line",
    },
    {
      name: "Requests",
      path: "/admin/request",
      icon: "ri-user-line",
    },
    {
      name: "Doctors",
      path: "/admin/doctorLists",
      icon: "ri-user-star-line",
    },
  ];
  let name = "";
  if (user.name) {
    name = user.name;
  }
  else {
    name = user.firstName;
  }
  const menuToBeRendered = user.name ? (user.isAdmin ? adminMenu : userMenu) : doctorMenu;
  const role = user.name ? (user.isAdmin ? "Admin" : "User") : "Doctor";
  return (
    <div className="main">
      <div className="Layout">

        <div className="sidebar">
          <div className="sidebar-header">
            <img src={user.image} className="profile_photo"></img>
            <h2 className="role">{name}</h2>
            <p className="specialization">{user.specialization}</p>

          </div>

          <div className="menu">
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div className={`menu-item ${isActive ? "active-menu-item" : ""}`} key={menu.path}>
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}
            <div
              className={`d-flex menu-item `}
              onClick={() => {
                localStorage.clear();
                navigate("/");
              }}
            >
              <i className="ri-logout-circle-line"></i>
              {!collapsed && <Link to="/login">Logout</Link>}
            </div>
          </div>

        </div>
      </div>
      <div className="contentContainer">
        <div className="content">{children}</div>
      </div>





    </div>

  );
}

export default Layout;
