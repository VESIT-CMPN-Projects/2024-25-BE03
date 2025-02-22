import React from "react";
import SideBar from "./SideBar";
import SpeakerStats from "./SpeakerStats";
import HomeCards from "./HomeCards";
import MeetHistory from "./MeetHistory";
import Footer from "./Footer";

function HomePage() {
  return (
    <div className="h-screen bg-white">
      <div className="w-full p-1 h-14 bg-[#06508e] fixed top-0 "> </div>
      <div className=" mt-16 px-1 ml-4 mx-4">
        <h1 className="text-3xl font-semibold" style={{ fontStyle: "oblique" }}>CareerLens</h1>
        <hr className="border-zinc-400 mt-2" />
        <p className="my-4 lg:text-xl md:text-sm leading-[1.8] text-justify" style={{ fontFamily: "inherit", fontStyle: "oblique" }}>CareerLense is a Google Meet extension designed to enhance career counseling sessions through real-time transcription, summarization, and interactive analytics. The tool leverages an LLM for accurate speech-to-text conversion, extracting key insights, and generating summaries. <br /> Additional features include a Q&A system for personalized guidance and data visualizations to track progress and engagement. The project aims to create a seamless, insightful, and efficient counseling experience for both counselors and clients.
        </p>
        {/* <hr className="border-zinc-400 mt-6" /> */}

        <HomeCards />
        <hr className="border-zinc-400 mt-6" />
        <div className="">
          <MeetHistory />
        </div>
        
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;