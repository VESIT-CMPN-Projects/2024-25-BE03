import axios from 'axios';
import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

const OnGoingTranscript = ({ botId }) => {
    const [transcriptData, setTranscriptData] = useState([]);

    function fetchTranscript() {
        try {
            fetch(`${API_URL}/get_transcript?bot_id=${botId}`)
                .then(response => response.json())
                .then(data => setTranscriptData(data.transcript))
                .catch(error => console.error('Error fetching transcript:', error));
        } catch (error) {
            console.error('Error fetching transcript:', error);
            alert('Failed to fetch the transcript.');
        }
    }

    return (
        <div className="p-4 h-[50vh] overflow-y-auto">
            <button onClick={fetchTranscript}>Fetch Transcript</button>
            {transcriptData ? (transcriptData.map((line, index) => (
                <div key={index} className="mb-2">
                    <strong>{line.speaker_name}:</strong> {line.text}
                </div>
            ))) : (
                <p>
                    No transcript available yet.
                </p>
            )}
        </div>
    );
};

export default OnGoingTranscript;