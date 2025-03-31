import React, { useState, useEffect, useRef } from "react";
import { SendHorizontal } from "lucide-react";
import Together from "together-ai";

const OnGoingChat = ({ botId }) => {
  const [transcript, setTranscript] = useState([]);

  const together = new Together({
    apiKey: import.meta.env.VITE_TOGETHER_AI_API_KEY,
  });

  const API_URL = import.meta.env.VITE_API_URL;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const formatTranscript = (transcriptArray) => {
    return transcriptArray
      .map(entry => `${entry.speaker_name}: ${entry.text}`)
      .join("\n");
  };

  const fetchAIResponse = async (question) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/get_transcript?bot_id=${botId}`);
      const data = await response.json();
      const transcript = formatTranscript(data.transcript);

      const prompt = `You are a professional meeting analyzer. This is the question asked by the user. Find the proper answer from the transcript of the meeting. Refer only to the given transcript and nothing else. Give me the answer in HTML tag format, if bullets then add <ul> & <li> tag, if paragraphs add <p>, if something important then add in <b> tags. Keep it concise and proper.\n\n### Transcript:\n${transcript}\n\n### Question:\n${question}\n\n### Answer:`;

      const aiResponse = await together.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo",
        max_tokens: 150,
        temperature: 0.7,
        top_p: 0.7,
        top_k: 50,
        repetition_penalty: 1,
        stop: ["<|eot_id|>", "<|eom_id|>"],
        stream: false,
      });

      return aiResponse?.choices?.[0]?.message?.content || "No response available.";
    } catch (error) {
      console.error("Error fetching AI response:", error);
      return "Error: Unable to fetch response.";
    } finally {
      setLoading(false);
    }
  };


  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    const userMessage = { question: newMessage };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setNewMessage("");

    const aiResponse = await fetchAIResponse(newMessage);

    setMessages((prevMessages) =>
      prevMessages.map((msg, index) =>
        index === prevMessages.length - 1 ? { ...msg, answer: aiResponse } : msg
      )
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && newMessage.trim()) {
      handleSendMessage();
    }
  };

  return (
    <div className="p-4 h-[50vh] flex flex-col relative">
      <div className="flex-grow overflow-y-auto mb-12">
        {messages.map((msg, index) => (
          <>
            <div key={index} className="mb-2">
              <strong>Q:</strong> {msg.question}
              <br />
              <strong>A:</strong>

            </div>
            <div>
              <div dangerouslySetInnerHTML={{ __html: msg.answer }}></div>
            </div>
          </>
        ))}

        {loading && <p className="text-gray-500">Fetching response...</p>}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex absolute bottom-0 w-full bg-white p-2 border-t">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          ref={inputRef}
          className="border p-2 flex-grow"
          placeholder="Type your question..."
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 hover:bg-blue-700 w-25 text-white p-2 ml-2 rounded-3xl"
          disabled={loading}
        >
          <SendHorizontal size={34} />
        </button>
      </div>
    </div>
  );
};

export default OnGoingChat;