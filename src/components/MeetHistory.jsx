import React, { useState, useEffect } from 'react';
import './MeetHistory.css';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const MeetHistory = () => {
    const navigate = useNavigate();
    const [meetings, setMeetings] = useState([]);

    useEffect(() => {
        // Fetch meetings data from API (replace with actual API call)
        fetch(`${API_URL}/get_all_meetings`)
            .then(response => response.json())
            .then(data => setMeetings(data['meetings']))
            .catch(error => console.error('Error fetching meetings:', error));
    }, []);

    const activeMeetings = meetings.filter(meet => meet.status === 'active').sort((a, b) => new Date(b.start_time) - new Date(a.start_time));
    const pastMeetings = meetings.filter(meet => meet.status !== 'active').sort((a, b) => new Date(b.start_time) - new Date(a.start_time));

    const summarizeMeet = async (meetingId) => {
        try {
            const transcript = await fetch(`${API_URL}/get_formatted_transcript?meeting_id=${meetingId}`)
                .then(response => response.json())
                .then(data => data.transcript)
                .catch(error => console.error('Error fetching transcript:', error));

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
            console.error('Error summarizing meeting:', error);
            alert('Failed to summarize the meeting.');
        }
    };

    return (
        <div className='m-2 mt-4 mb-8'>
            <h2 className='text-2xl font-semibold' style={{ fontStyle: "oblique" }}>Meet History</h2>
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 mt-4">
                {/* Active Meetings */}
                <div className="lg:col-span-2">
                    <h3 className='text-xl font-semibold mb-2'>Active Meetings</h3>
                    <div className="meet-history-container overflow-x-auto">
                        {activeMeetings.length > 0 ? (
                            <table className="meet-history-table min-w-full">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="py-2 px-4 text-left">Meet Link</th>
                                        <th className="py-2 px-4 text-left">Start Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {activeMeetings.map((meet, index) => (
                                        <tr key={index} className="border-b hover:bg-gray-50">
                                            <td className="py-2 px-4">
                                                <a href={meet.meeting_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                                                    {meet.meeting_url}
                                                </a>
                                            </td>
                                            <td className="py-2 px-4">{new Date(meet.start_time).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-gray-500">No active meetings</p>
                        )}
                    </div>
                </div>

                {/* Past Meetings */}
                <div className="lg:col-span-4">
                    <h3 className='text-xl font-semibold mb-2'>Past Meetings</h3>
                    <div className="meet-history-container overflow-x-auto">
                        <table className="meet-history-table min-w-full">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="py-2 px-4 text-left">Meet Link</th>
                                    <th className="py-2 px-4 text-left">Start Time</th>
                                    <th className="py-2 px-4 text-left">End Time</th>
                                    <th className="py-2 px-4 text-left">Summarize</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pastMeetings.map((meet, index) => (
                                    <tr key={index} className="border-b hover:bg-gray-50">
                                        <td className="py-2 px-4">
                                            <a href={meet.meeting_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                                                {meet.meeting_url}
                                            </a>
                                        </td>
                                        <td className="py-2 px-4">{new Date(meet.start_time).toLocaleString()}</td>
                                        <td className="py-2 px-4">{new Date(meet.end_time).toLocaleString()}</td>
                                        <td className="py-2 px-4">
                                            {meet.transcript && meet.transcript.length > 0 ? (
                                                <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => summarizeMeet(meet.meeting_id)}>
                                                    Summarize
                                                </button>
                                            ) : (
                                                <span className="text-gray-500">No transcript</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MeetHistory;