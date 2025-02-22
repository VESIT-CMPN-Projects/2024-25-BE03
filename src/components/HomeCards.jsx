import React, { useState } from "react";
import HomeModal from "./HomeModal";

function HomeCards() {
  // State to manage the modal visibility and content
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: ""});

  // Function to open the modal with the appropriate content
  const openModal = (title, content) => {
    setModalContent({ title });
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl">
          <h1 className="text-xl font-semibold">Create a Meeting</h1>
          <p className="mt-4 text-gray-600">
            Instantly start a new meeting with our app, where the bot joins automatically and is ready to capture everything.
          </p>
          <div className="mt-4 flex justify-end">
            <button
              onClick={() =>
                openModal(
                  "create"
                )
              }
              className="bg-[#06508e] text-white px-4 py-2 rounded-lg hover:text-white hover:bg-[#054072] transition duration-300"
            >
              Start Meeting
            </button>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl">
          <h1 className="text-xl font-semibold">Join the Meeting</h1>
          <p className="mt-4 text-gray-600">
            Simply enter your Google Meet link, and our bot will join to record, transcribe, and process the discussion in real time.
          </p>
          <div className="mt-4 flex justify-end">
            <button
              onClick={() =>
                openModal(
                  "join"
                )
              }
              className="bg-[#06508e] text-white px-4 py-2 rounded-lg hover:text-white hover:bg-[#054072] transition duration-300"
            >
              Join Meeting
            </button>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl">
          <h1 className="text-xl font-semibold">Add Transcript</h1>
          <p className="mt-4 text-gray-600">
            Upload a brief transcript or meeting audio, and our bot will generate a clear, concise summary with key insights.
          </p>
          <div className="mt-4 flex justify-end">
            <button
              onClick={() =>
                openModal(
                  "transcript"
                )
              }
              className="bg-[#06508e] text-white px-4 py-2 rounded-lg hover:text-white hover:bg-[#054072] transition duration-300"
            >
              Get Transcript
            </button>
          </div>
        </div>
      </div>

      {/* Modal Component */}
      {isModalOpen && (
        <HomeModal
          title={modalContent.title}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default HomeCards;
