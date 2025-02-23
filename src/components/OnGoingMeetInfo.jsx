import React from "react";

function OnGoingMeetInfo() {
    return (
        <div>
            <div className="flex flex-wrap mt-4 p-1">
                <div className="w-full sm:w-1/2">
                    <p>Meeting Id: <span className="font-bold">#123</span></p>
                </div>
                <div className="w-full sm:w-1/2 p-1">
                    <p>Bot Status: <span className="font-bold">Joined</span></p>
                </div>
            </div>
            <div className="flex flex-wrap mt-4 p-1">
                <div className="w-full sm:w-1/2">
                    <p>Meeting Members: <span className="font-bold">32</span></p>
                </div>
                <div className="w-full sm:w-1/2 p-1">
                    <p>Meeting Name: <span className="font-bold">Placement nahi hora</span></p>
                </div>
            </div>
            {/* <div className="flex flex-wrap mt-4 p-1">
                <div className="w-full sm:w-1/2">
                    <p>asdsad</p>
                </div>
                <div className="w-full sm:w-1/2 p-1">
                    <p>asdsad</p>
                </div>
            </div> */}
        </div>
    );
}

export default OnGoingMeetInfo;
