import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import LoadingSpinner from './LoadingSpinner';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function HomeModal({ title, onClose }) {
    const [isLoading, setIsLoading] = useState(false);
    const [meetingName, setMeetingName] = useState("");
    const [meetUrl, setMeetUrl] = useState("");
    const [transcript, setTranscript] = useState("");
    const navigate = useNavigate();

    const handleJoinMeet = async () => {
        if (!meetUrl) {
            alert("Please enter a valid Google Meet link.");
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post(`${API_URL}/create_bot`, {
                "meeting_url": meetUrl,
                "bot_name": "CareerLens",
                "user_id": "piyushchugeja"
            });

            if (response.status === 201) {
                const { bot_id, meeting_id } = response.data;

                localStorage.setItem("bot_id", bot_id);
                localStorage.setItem("meeting_id", meeting_id);

                setIsLoading(false);
                alert("Bot joined the meeting successfully. Navigating to the meeting page.");
                navigate("/ongoing");
            } else {
                alert("An error occurred. Please try again. Response not 201.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };


    const handleClick = () => {
        if (title === "add") {
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
        } else if (title === "join") {
            handleJoinMeet();
        } else {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                openLink();
            }, 3000);
        }
    };

    const openLink = () => {
        if (title === "create") {
            window.open("https://meet.google.com/new", "_blank");
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <div className="bg-white p-6 rounded-lg lg:max-w-2xl w-full">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-semibold">
                            {title === "create" ? "Create a Meeting" : title === "join" ? "Join the Meeting" : "Add Transcript"}
                        </h1>
                        <button onClick={onClose}>
                            <svg
                                className="w-6 h-6 text-black"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <hr className="border-zinc-400 mt-4" />
                    {title === "create" ? (
                        <div className="mt-4 items-center">
                            <p className="mt-4 text-gray-600">
                                Start a new meeting by entering your Google Meet link. Our bot will join to record, transcribe, and process the discussion in real time.
                            </p>
                            <p className="mt-4">
                                The Google Meet will be created and you will be redirected to the meeting page.
                            </p>
                        </div>
                    ) : title === "join" ? (
                        <div className="mt-4 items-center">
                            <p className="mt-4 text-gray-600">
                                Simply enter your Google Meet link, and our bot will join to record, transcribe, and process the discussion in real time.
                            </p>
                            <form className="mt-4">
                                <label htmlFor="meet-link" className="text-sm">Google Meet Link</label>
                                <input
                                    type="text"
                                    placeholder="Enter Google Meet Link"
                                    className="border border-gray-400 rounded-lg p-2 w-full"
                                    value={meetUrl}
                                    onChange={(e) => setMeetUrl(e.target.value)}
                                />
                            </form>
                            <p className="mt-4">
                                Kindly wait for the bot to join the meeting.
                            </p>
                        </div>
                    ) : (
                        <div className="mt-4 items-center">
                            <p className="mt-4 text-gray-600">
                                Upload a brief transcript or meeting audio, and our bot will generate a clear, concise summary with key insights.
                            </p>
                            <form className="mt-4">
                                <label htmlFor="meetName" className="text-sm">Meeting Name</label>
                                <input
                                    type="text"
                                    name="meetName"
                                    value={meetingName}
                                    onChange={(e) => setMeetingName(e.target.value)}
                                    placeholder="Enter Meeting Name"
                                    className="border border-gray-400 rounded-lg p-2 w-full"
                                />
                                <label htmlFor="transcript" className="text-sm">Transcript</label>
                                <textarea
                                    placeholder="Enter Transcript"
                                    name="transcript"
                                    value={transcript}
                                    onChange={(e) => setTranscript(e.target.value)}
                                    className="border border-gray-400 rounded-lg p-2 w-full"
                                />
                            </form>
                            <label htmlFor="" className="text-center">OR</label>
                            <form className="mt-1">
                                <label htmlFor="transcript" className="text-sm">Audio File</label>
                                <input
                                    type="file"
                                    placeholder="Upload audio"
                                    className="border border-gray-400 rounded-lg p-2 w-full"
                                />
                            </form>
                            <p className="mt-4">
                                The transcript will be processed and you will be redirected to the summary with key insights.
                            </p>
                        </div>
                    )}
                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={handleClick}
                            className="bg-[#06508e] text-white px-4 py-2 rounded-lg hover:text-white hover:bg-[#054072] transition duration-300"
                        >
                            {title === "create" ? "Start Meeting" : title === "join" ? "Join Meeting" : "Process Transcript"}
                            <ArrowRight size={20} className="inline ml-2" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default HomeModal;