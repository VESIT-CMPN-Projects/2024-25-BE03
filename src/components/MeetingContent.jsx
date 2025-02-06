import React, { useState, useEffect, useRef } from "react";
import SpeakerStats from "./SpeakerStats";
import SearchHistory from "./SearchHistory";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Together from "together-ai"; // Import the Together AI package

// Initialize the Together API with your API key
const together = new Together({
  apiKey: "2cc4b405efc4418344d42288006d35a1106b78f94edf166137674b2ffd31187e",
});

function MeetingContent() {
  const [showAllHistory, setShowAllHistory] = useState(false);
  const [showOptions, setShowOptions] = useState(null);
  const optionsRef = useRef();
  const navigate = useNavigate();
  const [meetingData, setMeetingData] = useState(null);

  const [aiResponse, setAiResponse] = useState(""); // State for AI response
  const searchHistory = [
    { id: 1, title: "Summary of the meeting", date: "10/15/2024" },
    { id: 2, title: "Key points discussed", date: "10/14/2024" },
    { id: 3, title: "Follow-up tasks", date: "10/13/2024" },
    { id: 4, title: "Participant insights", date: "10/12/2024" },
    { id: 5, title: "Agenda analysis", date: "10/11/2024" },
  ];
  const [loading, setLoading] = useState(false);

  const handleQuickSummary = async () => {
    setLoading(true);
    const meetingData = JSON.parse(localStorage.getItem("meetingData"));

    if (!meetingData) {
      alert("No meeting data found.");
      return;
    }

    const prompt = `Just return me the json file starting from curly braces with no starting text, just json file format.
      Please provide a comprehensive summary of the following meeting transcription in a valid JSON format. 
      The JSON response should contain the following fields:
      - "meeting_id": A unique identifier for the meeting.
      - "summary": A detailed summary of the meeting's content, including key points discussed and general flow.
      - "action_items": A list of key action items discussed during the meeting (at least five) with descriptions.
      - "insights": A list of key insights or observations made during the meeting (at least five) that highlight important takeaways.
      - "speakers": A list of speaker names or roles.
      
      Ensure the JSON is syntactically correct, well-structured, and follows this exact format:
      Example for Summary:
        ### Summary of the Meeting

        In this session, the discussion focused on various topics. Key insights and strategies include:
        - A narrative overview of the main discussion points.
        - Details about critical issues raised.
        - Analysis of decisions made or suggestions offered.
        - Key quotes or moments that stood out.
       
        Example of insights:
        ### Key Insights    
        - **Insight 1:** Detailed observation.
        - **Insight 2:** Detailed observation.
        - **Insight 3:** Detailed observation.
        - **Insight 4:** Detailed observation.
        - **Insight 5:** Detailed observation.

      It is Not neccessary to only have 5 action items and insights, you can have more than 5 as well. It should cover all the important points discussed in the meeting.

      Example JSON Format:
      {
          "meeting_id": "COUNSEL_001",
          "summary": "A detailed summary of the meeting goes here, covering various topics discussed. Must be comprehensive and well-structured. It should be more than 4 sentences or 2 paragraphs.",
          "action_items": [
              "Action item 1: Description",
              "Action item 2: Description",
              "Action item 3: Description",
              "Action item 4: Description",
              "Action item 5: Description"
          ],
          "insights": [
              " - Insight 1: Detailed observation from the meeting. Nothing outside the meeting.",
              " - Insight 2: Detailed observation from the meeting. Nothing outside the meeting.",
              " - Insight 3: Detailed observation from the meeting. Nothing outside the meeting.",
              " - Insight 4: Detailed observation from the meeting. Nothing outside the meeting.",
              " - Insight 5: Detailed observation from the meeting. Nothing outside the meeting."
              ....
          ],
          "speakers": ["Speaker 1 - role", "Speaker 2 - role", ...]
      }
  
      ### Meeting ID: ${meetingData.meetingId} 
      ### Meeting content:
      ${meetingData.transcript} 
      ### JSON Output;`;

    // Prepare API call to Together API
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

      console.log("API Response:", response); // Log the response

      if (response) {
        const result = response.choices[0]?.message?.content;
        console.log("Result:", result); // Log the result

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
      console.error("Error:", error); // Log any errors
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

    // setLoading(true);
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
      
      console.log("API Response:", response); // Log the response

      if (response) {
        const result = response.choices[0]?.message?.content;
        console.log("Result:", result); // Log the result
        setAiResponse(result);
      }
    } catch (error) {
      console.error("Error:", error); // Log any errors
      alert("An error occurred while finding the answer.");
    }
    
    // setLoading(false);
  };
  

  const visibleHistory = showAllHistory
    ? searchHistory
    : searchHistory.slice(0, 1);

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

  const handleEllipsisClick = (id) => {
    setShowOptions(showOptions === id ? null : id);
  };

  if (!meetingData) {
    return <p>Loading...</p>;
  }
  const parsedTranscript = parseTranscript(meetingData.transcript);

  return (
    <div className="p-8 w-full h-screen overflow-y-auto ">
      {/* Search bar */}
      <div className="flex items-center px-2 py-1 rounded-lg bg-white border-2">
        <input
          type="text"
          placeholder="Search in Transcript"
          className="flex-1 px-4 py-2 bg-transparent outline-none text-zinc-700 text-xl"
        />
      </div>

      {/* Main content area */}
      <div className="flex mt-6">
        <div className="w-[70%] pr-8">
          <h1 className="text-4xl font-semibold">{meetingData.meetingName}</h1>
          <h2 className="text-sm mt-3">
            Recorded by msv, {meetingData.date}, Last updated 3
            days ago
          </h2>
          <h1 className="text-2xl font-semibold mt-4">Tools</h1>
          <h2 className="text-sm mt-2">Quick Prompts</h2>
          <div className="flex w-full gap-5 mt-2">
            <button
              onClick={handleQuickSummary}
              disabled={loading} // Disable the button while loading
              className="bg-[#F5F2FE] p-3 w-full rounded-lg border-2 font-semibold"
            >
              {loading ? "Loading..." : "Quick Summary"}
            </button>
            <div className="bg-[#F5F2FE] p-3 w-full rounded-lg border-2 font-semibold">
              Bullet Points
            </div>
          </div>

          {/* Search box for asking questions */}
          <div className="flex w-full mt-5 gap-4">
            <div className="flex w-full items-center px-2 py-1 rounded-lg bg-white border-2 shadow-md">
              <input
                type="text"
                placeholder="Ask anything about this meeting."
                className="flex-1 px-4 py-2 bg-transparent outline-none text-zinc-800 text-xl"
                name="question"
                id="question"
              />
            </div>
            <button className="rounded-lg text-xl px-6 bg-white border-2 shadow-md text-zinc-800 font-semibold" onClick={findAnswer}>
              ✨Ask
            </button>
          </div>

          {/* Search History */}
          {/* <SearchHistory
            searchHistory={visibleHistory} // Pass only visible history
            showAllHistory={showAllHistory}
            setShowAllHistory={setShowAllHistory}
            showOptions={showOptions}
            setShowOptions={setShowOptions}
          /> */}

          {/* display answer */}

          {aiResponse ?
            <div className="mt-5">
            <h1 className="text-2xl font-semibold">Answer</h1>
            <div className="bg-white p-6 rounded-lg border-2 mt-4">
              <div className="flex justify-between items-center mb-4">                
              </div>
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
          </div> : ""
          }
            


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
        <div className="w-[30%] h-full sticky top-0">
          <SpeakerStats transcript={parsedTranscript} />
        </div>
      </div>
    </div>
  );
}

export default MeetingContent;
