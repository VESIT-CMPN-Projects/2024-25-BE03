import React from "react";
import SideBar from "./SideBar";
import SpeakerStats from "./SpeakerStats";
import HomeCards from "./HomeCards";
import MeetHistory from "./MeetHistory";
import Footer from "./Footer";
import "./HomePage.css";

function HomePage() {
	return (
		<div className="h-screen bg-white">
			<div className="w-full p-1 h-17 bg-white fixed top-0 ">
				<h1
					className="text-3xl font-semibold p-2 heading "
					style={{ fontStyle: "oblique" }}
				>
					CareerLens
				</h1>
				<hr className="border-zinc-400 mt-2" />
			</div>
			<div className=" mt-20 px-1 ml-4 mx-4">
				<p
					className="my-4 lg:text-xl md:text-sm leading-[1.8] text-justify"
					style={{ fontFamily: "inherit", fontStyle: "oblique" }}
				>
					CareerLens is a tool designed to enhance career
					counseling sessions through real-time transcription, summarization,
					and interactive analytics. It leverages an LLM for accurate
					speech-to-text conversion, extracting key insights, and generating
					summaries.
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
