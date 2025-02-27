import React, { useState } from "react";
import { PlusSquare, Calendar, PhoneOutgoing, Settings, Archive } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
// import app.css
import "../app.css";

function SideBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for toggling sidebar
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  // Toggle sidebar visibility
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="relative">
      {/* Hamburger Icon for mobile, or Close button if the sidebar is open */}
      <button
        className={`lg:hidden absolute top-4 left-5 z-10 ${isSidebarOpen ? "text-slide-in" : "text-slide-out"}`}
        style={{ transition: "transform 0.3s", transform: isSidebarOpen ? "rotate(180deg)" : "", marginLeft: isSidebarOpen ? "200px" : "", transitionBehavior: "smooth" }}
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8 h-8 text-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8 h-8 text-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`h-screen w-65 flex flex-col bg-white shadow-lg fixed top-0 left-0 transform transition-transform ease-in-out duration-300 lg:relative lg:block ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`} 
        style={{ zIndex: 1 }}
      >
        {/* Top section (Image) */}
        <div className="w-full px-7 pt-9 mt-5 pb-1">
          <a href="/">
          <img
            className="w-[180px]"
            src="src/assets/CareerLens logo.svg"
            alt="CareerLens Logo"
          />
          </a>

        </div>

        {/* Scrollable middle section */}
        <div className="px-7 pt-5 flex-1 overflow-y-auto">
          <div className="relative flex flex-col">
            <div
              className={`hover:bg-[#F5F2FE] focus:bg-[#F5F2FE] cursor-pointer pointer-events-auto p-3 rounded-lg flex items-center gap-3 ${
                isActive("/") ? "bg-[#F5F2FE]" : ""
              }`}
              onClick={() => navigate("/")}
            >
              <PlusSquare size={20} />
              <span>Dashboard</span>
            </div>
            <div
              className={`hover:bg-[#F5F2FE] focus:bg-[#F5F2FE] cursor-pointer pointer-events-auto p-3 rounded-lg flex items-center gap-3 ${
                isActive("/meeting-content") ? "bg-[#F5F2FE]" : ""
              }`}
              onClick={() => navigate("/meeting-content")}
            >
              <Calendar size={20} />
              <span>My Meetings</span>
            </div>
            <div className={`hover:bg-[#F5F2FE] focus:bg-[#F5F2FE] cursor-pointer pointer-events-auto p-3 rounded-lg flex items-center gap-3 ${
                isActive("/ongoing") ? "bg-[#F5F2FE]" : ""
              }`}
              onClick={() => navigate("/ongoing")}
            >
              <PhoneOutgoing size={20} />
              <span>Ongoing Meet</span>
            </div>
            <div className="hover:bg-[#F5F2FE] focus:bg-[#F5F2FE] cursor-pointer pointer-events-auto p-3 rounded-lg flex items-center gap-3">
              <Settings size={20} />
              <span>Account & Settings</span>
            </div>
            {/* <div className="hover:bg-[#F5F2FE] focus:bg-[#F5F2FE] cursor-pointer pointer-events-auto p-3 rounded-lg flex items-center gap-3">
              <Archive size={20} />
              <span>Archive</span>
            </div> */}
          </div>
          <hr className="border-zinc-200 mt-5 mb-8" />
        </div>

        {/* Bottom section (User Details) */}
        <div className="px-5 py-4">
          <div className="flex items-center gap-3">
            <img
              src="src/assets/images/pfp1.jpeg"
              alt="User Profile"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h2 className="font-medium">User</h2>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
