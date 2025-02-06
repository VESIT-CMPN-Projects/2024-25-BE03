import React from "react";
import { ChevronLeft, Copy, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useLocation, useNavigate } from "react-router-dom";

// Dummy action items data
const actionItems = [
  { id: "item1", text: "Complete the project report" },
  { id: "item2", text: "Review the meeting notes" },
  { id: "item3", text: "Schedule the next meeting" },
];

const markdown = `
# Project Overview: Action Items Manager

This project is a **React-based Action Items Manager** that allows users to view and interact with a list of tasks derived from meeting transcriptions. It aims to provide an intuitive interface for managing action items and tracking their completion status.

## Key Features

- **Checkbox Integration**: Each action item comes with a checkbox, allowing users to mark tasks as completed or pending.
- **Interactive UI**: Users can easily interact with the UI components like thumbs up, thumbs down, copy, and delete icons for each section.
- **React Markdown**: The project uses React Markdown to parse and render markdown content dynamically. This allows for a rich text display, making it easy to include formatted summaries or notes.
- **Customizable Components**: Custom components for rendering markdown elements such as headings, lists, and strong text are provided, ensuring consistent styling throughout the app.

## Technical Stack

- **React**: For building the user interface and handling component states.
- **React Markdown**: For parsing and rendering markdown content within the app.
- **Tailwind CSS**: For styling the UI components with a focus on responsiveness and ease of use.

## Usage

1. **Add Action Items**: Integrate action items from meeting notes and mark them as complete or pending.
2. **Review and Edit**: Review the summary of the meeting and make edits as necessary.
3. **Copy or Delete**: Use the built-in functionality to copy the meeting summary or delete items that are no longer needed.

## Future Enhancements

- **Persistence with Local Storage**: Save action items and their states in local storage so that they persist even after a page refresh.
- **User Authentication**: Add user authentication for personalized action item management.
- **API Integration**: Integrate with a backend to fetch action items from a server or save them for multiple users.

## Conclusion

This project serves as a simple yet effective way to manage tasks and action items derived from meetings. It leverages the power of React and Markdown to provide a seamless user experience while remaining lightweight and customizable.
`;

function ActionItems() {
  const location = useLocation();
  const { summary, action_items, insights } = location.state || {};
  const navigate = useNavigate();

  return (
    <div className="p-8 w-full h-screen overflow-y-auto">
      <div
        className="text-lg items-center underline w-fit flex gap-2 text-zinc-500 cursor-pointer mb-4"
        onClick={() => navigate("/meeting-content")}
      >
        <ChevronLeft size={20} />
        <h1 className="">Meeting Transcription</h1>
      </div>
      {/* Action Items */}
      <div className="bg-white p-6 rounded-lg border-2 mt-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">✅ Action Items</h1>
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
          {action_items.map((item, index) => (
            <div key={index} className="flex gap-3 items-center mb-2">
              <input
                type="checkbox"
                className="size-4"
                id={`item-${index}`}
                onChange={() => {}}
              />
              <label htmlFor={`item-${index}`} className="">
                {item}
              </label>
            </div>
          ))}
        </div>
      </div>
      {/* Summary */}
      <div className="bg-white p-6 rounded-lg border-2 mt-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">📝 Summary</h1>
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
              li: ({ children }) => (
                <li className="mb-1 text-lg text-zinc-600">{children}</li>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold">{children}</strong>
              ),
            }}
          >
            {Array.isArray(summary) ? summary.join(", ") : summary}
          </ReactMarkdown>
        </div>
      </div>
      {/* Insights */}
      <div className="bg-white p-6 rounded-lg border-2 mt-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">📝 Insights</h1>
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
              li: ({ children }) => (
                <li className="mb-1 text-lg text-zinc-600">{children}</li>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold">{children}</strong>
              ),
            }}
          >
            {Array.isArray(insights) ? insights.join("\n") : insights}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default ActionItems;
