import React, { useState } from "react";
import OnGoingTranscript from "./OnGoingTranscript";
import OnGoingChat from "./OnGoingChat";

function OnGoingMeetTab({ meetingId, botId }) {
	const [activeTab, setActiveTab] = useState("transcript");

	return (
		<div className="p-4">
			<div className="flex border-b mb-4">
				<button
					className={`p-2 flex-grow ${activeTab === "transcript" ? "border-b-2 border-blue-500" : ""}`}
					onClick={() => setActiveTab("transcript")}
				>
					Transcript
				</button>
				<button
					className={`p-2 flex-grow ${activeTab === "chat" ? "border-b-2 border-blue-500" : ""}`}
					onClick={() => setActiveTab("chat")}
				>
					Chat
				</button>
			</div>
			<div>
				{activeTab === "transcript" && <OnGoingTranscript botId={botId} />}
				{activeTab === "chat" && <OnGoingChat botId={botId} />}
			</div>
		</div>
	);
}

export default OnGoingMeetTab;