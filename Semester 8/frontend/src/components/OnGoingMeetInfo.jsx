import React from "react";

function OnGoingMeetInfo({ meetingId, botStatus }) {
    return (
        <div>
            <div className="flex flex-wrap mt-4 p-1">
                <div className="w-full sm:w-1/2">
                    <p>Meeting Id: <span className="font-bold">#{meetingId || "Loading..."}</span></p>
                </div>
                <div className="w-full sm:w-1/2 p-1">
                    <p>Bot Status: <span className="font-bold">{botStatus}</span></p>
                </div>
            </div>
        </div>
    );
}

export default OnGoingMeetInfo;