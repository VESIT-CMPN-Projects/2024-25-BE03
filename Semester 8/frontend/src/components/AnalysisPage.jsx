import React from "react";
import { ChevronLeft, Copy, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useLocation, useNavigate } from "react-router-dom";

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
				<h1 className="">Meeting Analysis</h1>
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

			{/* Action Items */}
			<div className="bg-white p-6 rounded-lg border-2 mt-4">
				<div className="flex justify-between items-center mb-4">
					<h1 className="text-xl font-semibold">✅ Action Items</h1>
					<div className="flex gap-4 items-center">
						<ThumbsUp size={20} />
						<ThumbsDown size={20} />
						<div className="flex gap-1 items-center" onClick={() => { navigator.clipboard.writeText(action_items.join("\n")); }}>
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
								onChange={() => { }}
							/>
							<label htmlFor={`item-${index}`} className="">
								{item}
							</label>
						</div>
					))}
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
					{insights.map((insight, index) => (
						<div key={index} className="flex gap-3 items-center mb-2">
							<input
								type="checkbox"
								className="size-4"
								id={`insight-${index}`}
								onChange={() => { }}
							/>
							<label htmlFor={`insight-${index}`} className="">
								{insight}
							</label>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default ActionItems;
