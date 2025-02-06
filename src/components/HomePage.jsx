import React from "react";
import SideBar from "./SideBar";
import SpeakerStats from "./SpeakerStats";

function HomePage({ children }) {
  return (
    <div className="h-screen w-screen bg-white flex">
      <div className="h-full w-[350px] flex-shrink-0">
        <SideBar />
      </div>
      <div className="h-full w-full bg-slate-50">{children}</div>
    </div>
  );
}

export default HomePage;
