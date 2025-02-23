import React, { useState, useEffect, useRef } from "react";
import SpeakerStats from "./SpeakerStats";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Together from "together-ai";
import Footer from "./Footer";

// Initialize Together AI
const together = new Together({
	apiKey: import.meta.env.VITE_TOGETHER_AI_API_KEY,
});

function MeetingContent() {
	const [showAllHistory, setShowAllHistory] = useState(false);
	const [showOptions, setShowOptions] = useState(null);
	const optionsRef = useRef();
	const navigate = useNavigate();
	const [meetingData, setMeetingData] = useState(null);
	const [aiResponse, setAiResponse] = useState(""); // State for AI response
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const storedData = localStorage.getItem("meetingData");
		if (storedData) {
			setMeetingData(JSON.parse(storedData));
		}
		function handleClickOutside(event) {
			if (optionsRef.current && !optionsRef.current.contains(event.target)) {
				setShowOptions(null);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleQuickSummary = async () => {
		setLoading(true);
		const meetingData = JSON.parse(localStorage.getItem("meetingData"));

		if (!meetingData) {
			alert("No meeting data found.");
			return;
		}

		const prompt = `
		You are CareerLens, a career counseling meet summarizer. You are expert at understanding everything that is discussed in a career counseling session and you assist the user in post session queries.
		You will be given a career counseling meeting transcript, which you have to analyse, summarize and present to the user.
		Please provide a JSON response summarizing the following meeting transcription.
		Return a comprehensible meeting summary, at least three or more key action items, at least three or more insights, and brief speaker information. 
		Do not hallucinate and make up information, stick to the transcript. Do only as directed.
		Ensure the "speakers" field includes only names or roles with minimal dialogue details. Return only the JSON output.

		### Meeting transcript:
			${meetingData.transcript} 

		### JSON Output Format:
		{{
			"summary": "<summary>",
			"action_items": ["<item1>", "<item2>", "<item3>", ...],
			"insights": ["<insight1>", "<insight2>", "<insight3>", ...],
			"speakers": ["<name or role 1>", "<name or role 2>", ...]
		}}`;

		try {
			const response = await together.chat.completions.create({
				messages: [{ role: "user", content: prompt }],
				model: "meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo",
				max_tokens: null,
				temperature: 0.7,
				top_p: 0.7,
				top_k: 50,
				repetition_penalty: 1,
				stop: ["<|eot_id|>", "<|eom_id|>"],
				stream: false,
			});

			if (response) {
				const result = response.choices[0]?.message?.content;
				if (result) {
					const parsedResult = JSON.parse(result);
					navigate("/action-items", {
						state: {
							summary: parsedResult.summary,
							action_items: parsedResult.action_items,
							insights: parsedResult.insights,
						},
					});
				} else {
					alert("Failed to get summary.");
				}
			} else {
				alert("Failed to get summary.");
			}
		} catch (error) {
			console.error("Error:", error);
			alert("An error occurred while getting the summary.");
		}
		setLoading(false);
	};

	const parseTranscript = (transcript) => {
		return transcript.split("\n").map((line, index) => {
			const [initial, ...messageParts] = line.split(":");
			const message = messageParts.join(":").trim();
			const time = `00:${index.toString().padStart(2, "0")}`;

			return {
				initial: initial.trim(),
				message,
				time,
			};
		});
	};

	const findAnswer = async () => {
		const question = document.getElementById("question").value;
		if (!question) {
			alert("Please enter a question.");
			return;
		}

		const prompt = `I have a question about the meeting transcription. Provide a precise answer to the question in markdown format, structured using JSON.
			Only answer the questions which is relevant to the meeting and user's career options mentioned in the transcript.
			When returning, return only the answer and nothing else. Do not return JSON, just the answer.
			Question: ${question}
			Context: ${meetingData.transcript}`;

		try {
			const response = await together.chat.completions.create({
				messages: [{ role: "user", content: prompt }],
				model: "meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo",
				max_tokens: null,
				temperature: 0.7,
				top_p: 0.7,
				top_k: 50,
				repetition_penalty: 1,
				stop: ["<|eot_id|>", "<|eom_id|>"],
				stream: false,
			});

			if (response) {
				const result = response.choices[0]?.message?.content;
				setAiResponse(result);
			}
		} catch (error) {
			console.error("Error:", error);
			alert("An error occurred while finding the answer.");
		}
	};

	if (!meetingData) {
		return <p>Loading...</p>;
	}
	const parsedTranscript = parseTranscript(meetingData.transcript);

	return (
		<div>
			<div className="pt-12 w-full overflow-y-auto">
				<div className="w-full p-1 h-17 bg-white fixed top-0 ">
					<h1 className="text-3xl font-semibold p-2 heading " style={{ fontStyle: "oblique" }}>CareerLens</h1>
					<hr className="border-zinc-400 mt-2" />
				</div>
			</div>
			<div className="px-8">
				{/* Search bar */}
				<div className="flex items-center mt-8 px-2 py-1 rounded-lg bg-white border-2 mb-6">
					<input
						type="text"
						placeholder="Search in Transcript"
						className="flex-1 px-4 py-2 bg-transparent outline-none text-zinc-700 text-xl"
					/>
				</div>

				{/* Main content area */}
				<div className="flex flex-col lg:flex-row mt-6 gap-6">
					<div className="md:w-[70%] sm:w-[100%]">
						<h1 className="text-4xl font-semibold">{meetingData.meetingName}</h1>
						<h2 className="text-sm mt-3">
							Recorded by user, {meetingData.date}
						</h2>
						<h1 className="text-2xl font-semibold mt-4">Tools</h1>
						<h2 className="text-sm mt-2">Quick Prompts</h2>
						<div className="flex gap-5 mt-2 flex-col lg:flex-row w-full">
							<div className="w-full">
								<button
									onClick={handleQuickSummary}
									disabled={loading}
									// className="bg-[#06508e] text-white px-4 py-2 rounded-lg hover:text-white hover:bg-[#054072] transition duration-300"
									className="bg-[#06508e] text-white hover:text-black transition duration-300 hover:bg-[#F5F2FE] p-3 w-full rounded-lg border-2 font-semibold"
								>
									{loading ? "Loading..." : "Quick Summary"}
								</button>
							</div>
							<div className="w-full">
								<button
									className="bg-[#06508e] text-white hover:text-black transition duration-300 hover:bg-[#F5F2FE] p-3 w-full rounded-lg border-2 font-semibold"
								>
									Bullet Points
								</button>
							</div>

						</div>
						{/* Search box for asking questions */}
						<div className="flex flex-col lg:flex-row w-full mt-5 gap-4">
							<div className="flex w-full  items-center px-2 py-1 rounded-lg bg-white border-2 shadow-md">
								<input
									type="text"
									placeholder="Ask questions"
									className="py-2 pl-3 w-full bg-transparent outline-none text-zinc-800 text-xl"
									name="question"
									id="question"
								/>
							</div>
							<button
								className="bg-[#F5F2FE] text-black hover:text-white transition duration-300 hover:bg-[#06508e] p-3 rounded-lg border-2 font-semibold"
								onClick={findAnswer}
							>
								✨Ask
							</button>
						</div>

						{/* display answer */}
						{aiResponse && (
							<div className="mt-5">
								<h1 className="text-2xl font-semibold">Answer</h1>
								<div className="bg-white p-6 rounded-lg border-2 mt-4">
									<div>
										<ReactMarkdown
											components={{
												h1: ({ children }) => (
													<h1 className="text-3xl text-zinc-800 font-semibold my-3">
														{children}
													</h1>
												),
												h2: ({ children }) => (
													<h2 className="text-2xl text-zinc-800 font-medium my-3">
														{children}
													</h2>
												),
												p: ({ children }) => (
													<p className="text-lg text-zinc-800 my-2">{children}</p>
												),
												ul: ({ children }) => (
													<ul className="text-lg text-zinc-800 my-2">{children}</ul>
												),
												li: ({ children }) => (
													<li className="mb-1 text-lg text-zinc-800">{children}</li>
												),
												strong: ({ children }) => (
													<strong className="text-lg text-zinc-800">{children}</strong>
												),
											}}
										>
											{aiResponse}
										</ReactMarkdown>
									</div>
								</div>
							</div>
						)}

						{/* Transcript */}
						<h1 className="text-2xl font-semibold mt-5">Transcript</h1>
						<div className="mt-2 flex flex-col gap-2">
							{parsedTranscript.map((item, index) => (
								<div
									key={index}
									className="w-full rounded-xl bg-white border-2 px-6 py-4 flex gap-6 items-center"
								>
									<div className="gap-1 flex flex-col items-center">
										<div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
											<span className="text-xl font-semibold">
												{item.initial.charAt(0)}
											</span>
										</div>
										<h3 className="text-sm text-zinc-400">{item.time}</h3>
									</div>
									<div className="flex flex-col gap-2">
										<h1 className="font-semibold">{item.initial}</h1>
										<h2 className="text-lg">{item.message}</h2>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Speaker Stats */}
					<div className="w-full lg:w-[30%] h-full sticky top-0 mt-4 lg:mt-0">
						<SpeakerStats transcript={parsedTranscript} />
					</div>
				</div>
			</div>
			<br />
			<Footer />
		</div>
	);
}

export default MeetingContent;
