import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OnGoingMeetInfo from "./OnGoingMeetInfo";
import OnGoingMeetTab from "./OnGoingMeetTab";
import Footer from "./Footer";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function OnGoingMeet() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [botStatus, setBotStatus] = useState("Joining...");
	const meetingId = localStorage.getItem("meeting_id");
	const botId = localStorage.getItem("bot_id");
	const navigate = useNavigate();

	useEffect(() => {
		if (!meetingId) {
			navigate("/");
		} else {
			setTimeout(() => {
				setBotStatus("Joined");
			}, 3000);
		}
	}, [meetingId, navigate]);

	const handleEndMeetingClick = () => setIsModalOpen(true);
	const handleCloseModal = () => setIsModalOpen(false);

	const handleConfirmEndMeeting = async () => {
		try {
			await axios.post(`${API_URL}/leave_meeting`, { meeting_id: meetingId, bot_id: botId });
			alert("Meeting ended.");
			const transcript = await fetch(`${API_URL}/get_formatted_transcript?meeting_id=${meetingId}`)
				.then(response => response.json())
				.then(data => data.transcript)
				.catch(error => console.error("Error fetching transcript:", error));

			const submissionDate = new Date().toLocaleString();
			const meetingData = {
				meetingName: `Meeting ${meetingId}`,
				transcript: transcript,
				date: submissionDate,
			};

			// Save meeting data to local storage
			localStorage.setItem("meetingData", JSON.stringify(meetingData));

			// Navigate to the MeetingContent page
			navigate("/meeting-content");
		} catch (error) {
			console.error(error);
			alert("Failed to end the meeting.");
		}
	};

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
						<p className="text-gray-500 mt-2">Bot Status: {botStatus}</p>
					</div>
					<button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={handleEndMeetingClick}>
						End Meeting
					</button>
				</div>

				<OnGoingMeetInfo meetingId={meetingId} botStatus={botStatus} />
				<hr className="border-gray-300 mt-6" />
				<OnGoingMeetTab meetingId={meetingId} botId={botId} />

				<Footer />
			</div>

			{/* Modal for End Meeting Confirmation */}
			{isModalOpen && (
				<div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
					<div className="bg-white p-6 rounded-md shadow-lg w-1/3">
						<h2 className="text-lg font-semibold">Are you sure you want to end the meeting?</h2>
						<div className="mt-4 flex justify-end gap-4">
							<button className="bg-[#06508e] text-white px-4 py-2 rounded-md" onClick={handleConfirmEndMeeting}>
								Yes
							</button>
							<button className="bg-gray-300 text-black px-4 py-2 rounded-md" onClick={handleCloseModal}>
								No
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default OnGoingMeet;