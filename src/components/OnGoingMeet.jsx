import React, { useState } from "react";
import OnGoingMeetInfo from "./OnGoingMeetInfo";
import OnGoingMeetTab from "./OnGoingMeetTab";
import Footer from "./Footer";

function OnGoingMeet({ status }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEndMeetingClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmEndMeeting = () => {
    // Here you can add the logic to end the meeting.
    console.log("Meeting ended.");
    alert("Meeting ended.");
    setIsModalOpen(false);
  };

  if (status === 1) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="w-full p-1 h-17 bg-white fixed top-0">
          <h1 className="text-3xl font-semibold p-2 heading" style={{ fontStyle: "oblique" }}>
            CareerLens
          </h1>
          <hr className="border-zinc-400 mt-2" />
        </div>
        <div className="mt-20 px-1 ml-4 mx-4 flex-grow">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Meeting in progress</h1>
              <p className="text-gray-500 mt-2">You are currently in a meeting</p>
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={handleEndMeetingClick}
            >
              End Meeting
            </button>
          </div>
          <OnGoingMeetInfo />
          <hr className="border-gray-300 mt-6" />
          <OnGoingMeetTab />
          <Footer />
        </div>

        {/* Modal for End Meeting Confirmation */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
              <h2 className="text-lg font-semibold">Are you sure you want to end the meeting?</h2>
              <div className="mt-4 flex justify-end gap-4">
                <button
                  className="bg-[#06508e] text-white px-4 py-2 rounded-md"
                  onClick={handleConfirmEndMeeting}
                >
                  Yes
                </button>
                <button
                  className="bg-gray-300 text-black px-4 py-2 rounded-md"
                  onClick={handleCloseModal}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-2xl font-bold">No ongoing meeting</h1>
        <p className="text-gray-500 mt-2">You are not currently in a meeting</p>
      </div>
      <Footer />
    </div>
  );
}

export default OnGoingMeet;