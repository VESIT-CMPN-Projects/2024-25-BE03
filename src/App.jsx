import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SideBar from "./components/SideBar";
import AddMeeting from "./components/AddMeeting";
import MeetingContent from "./components/MeetingContent";
import ActionItems from "./components/ActionItems";
import HomePage from "./components/HomePage";

function App() {
  return (
    <Router>
      <div className="flex fixed w-full">
        <SideBar />
        <div className="flex-1 overflow-auto h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-meeting" element={<AddMeeting />} />
            <Route path="/meeting-content" element={<MeetingContent />} />
            <Route path="/action-items" element={<ActionItems />} />
            {/* <Route path="*" element={<Navigate to="/add-meeting" />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
