import React from "react";
import { PlusSquare, Calendar, Share2, Settings, Archive } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  return (
    <div className="h-screen w-80 flex flex-col">
      {/* Top section (Image) */}
      <div className="w-full px-7 pt-9 pb-1">
        <img
          className="w-[180px]"
          src="src/assets/CareerLens logo.svg"
          alt="CareerLens Logo"
        />
      </div>

      {/* Scrollable middle section */}
      <div className="px-7 pt-5 flex-1 overflow-y-auto">
        <div className="relative flex flex-col">
          <div
            className={`hover:bg-[#F5F2FE] focus:bg-[#F5F2FE] cursor-pointer pointer-events-auto p-3 rounded-lg flex items-center gap-3 ${
              isActive("/add-meeting") ? "bg-[#F5F2FE]" : ""
            }`}
            onClick={() => navigate("/add-meeting")}
          >
            <PlusSquare size={20} />
            <span>Add a Meeting</span>
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
          <div className="hover:bg-[#F5F2FE] focus:bg-[#F5F2FE] cursor-pointer pointer-events-auto p-3 rounded-lg flex items-center gap-3">
            <Share2 size={20} />
            <span>Shared with Me</span>
          </div>
          <div className="hover:bg-[#F5F2FE] focus:bg-[#F5F2FE] cursor-pointer pointer-events-auto p-3 rounded-lg flex items-center gap-3">
            <Settings size={20} />
            <span>Account & Settings</span>
          </div>
          <div className="hover:bg-[#F5F2FE] focus:bg-[#F5F2FE] cursor-pointer pointer-events-auto p-3 rounded-lg flex items-center gap-3">
            <Archive size={20} />
            <span>Archive</span>
          </div>
        </div>
        <hr className="border-zinc-200 mt-5 mb-8" />
      </div>

      {/* Bottom section (User Details) */}
      <div className=" px-5 py-4">
        <div className="flex items-center gap-3">
          <img
            src="src\assets\images\pfp1.jpeg"
            alt="User Profile"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h1 className="font-medium">Manraj Singh Virdi</h1>
            <h2 className="text-sm text-gray-600">
              d2021.manrajsingh.virdi@ves.ac.in
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
