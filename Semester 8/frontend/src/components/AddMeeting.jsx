import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddMeeting() {
	const [meetingName, setMeetingName] = useState("");
	const [transcript, setTranscript] = useState("");
	const navigate = useNavigate();

	const handleSubmit = () => {
		const submissionDate = new Date().toLocaleString();
		const meetingData = {
			meetingName,
			transcript,
			date: submissionDate,
		};

		// Save meeting data to local storage
		localStorage.setItem("meetingData", JSON.stringify(meetingData));

		// Navigate to the MeetingContent page
		navigate("/meeting-content");
	};

	return (
		<div className="w-full h-screen flex flex-col items-center justify-center overflow-y-auto">
			<h1 className="text-3xl font-semibold mb-3">Add a New Meeting</h1>
			<div className="w-[700px] flex flex-col items-center bg-white gap-4">
				<div className="w-full flex gap-4 items-center">
					<input
						type="text"
						value={meetingName}
						onChange={(e) => setMeetingName(e.target.value)}
						placeholder="Meeting Name"
						className="flex-1 px-4 py-3 h-full bg-transparent border-2 rounded-lg w-full outline-none text-zinc-800 text-xl"
					/>
					<button
						onClick={handleSubmit}
						className="rounded-lg h-full text-lg px-3 bg-white border-2  text-zinc-800 font-semibold"
					>
						✨Submit
					</button>
				</div>
				<textarea
					type="text"
					value={transcript}
					onChange={(e) => setTranscript(e.target.value)}
					placeholder="Transcript"
					minLength={10}
					className="px-4 py-2 w-full h-56 border-2 rounded-lg bg-transparent mb-3 outline-none text-zinc-800 text-xl"
				/>
			</div>
		</div>
	);
}

export default AddMeeting;
