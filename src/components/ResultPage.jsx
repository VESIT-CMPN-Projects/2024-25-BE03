import React from "react";
import { ChevronLeft, Copy, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";
import ReactMarkdown from "react-markdown"; // Import markdown parser

const markdown = `
# Action Items

- [ ] Complete the project report
- [x] Review the meeting notes
- [ ] Schedule the next meeting
`;

function renderCheckbox(isChecked) {
  return (
    <input
      type="checkbox"
      checked={isChecked}
      readOnly
      className="mr-2" // Adjust margin as needed
    />
  );
}

function ResultPage({ aiResponse }) {
  return (
    <div>
      <div className="text-lg items-center underline w-fit flex gap-2 text-zinc-500 cursor-pointer mb-4">
        <ChevronLeft size={20} />
        <h1 className="">Meeting Transcription</h1>
      </div>
      <div className="bg-white p-6 rounded-lg border-2 mt-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">✨AI Generated Summary</h1>
          <div className="flex gap-4 items-center">
            <ThumbsUp size={20} />
            <ThumbsDown size={20} />
            <div className="flex gap-1 items-center">
              <Copy size={20} />
              <h1 className="text-sm">Copy</h1>
            </div>
            <div className="flex gap-1 items-center">
              <Trash2 size={20} />
              <h1 className="text-sm">Delete</h1>
            </div>
          </div>
        </div>
        <div>
          <ReactMarkdown
            components={{
              li: ({ children }) => {
                const text = children[0]; // Access the child directly
                const isChecked = text.startsWith("[x]"); // Check if it's checked

                // Update regex to remove only leading and trailing whitespace
                const itemText = text.replace(/^\s+|\s+$/g, "").trim();

                return (
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      readOnly
                      className="mr-2" // Adjust margin as needed
                    />
                    <span className="ml-2 text-lg text-zinc-600">
                      {itemText}
                    </span>
                  </label>
                );
              },

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
              h3: ({ children }) => (
                <h3 className="text-xl text-zinc-800 font-medium my-2">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-lg my-2 text-zinc-600">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc pl-8 my-2">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal pl-8 my-2">{children}</ol>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold">{children}</strong>
              ),
            }}
          >
            {markdown}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
