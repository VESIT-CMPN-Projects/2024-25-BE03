// SearchHistory.js
import React, { useRef, useEffect } from "react";
import {
	ArrowUpRightFromSquare,
	Edit,
	Ellipsis,
	Share2,
	Archive,
	Trash,
} from "lucide-react";

function SearchHistory({
	searchHistory,
	showAllHistory,
	setShowAllHistory,
	showOptions,
	setShowOptions,
}) {
	const optionsRef = useRef();

	const visibleHistory = showAllHistory
		? searchHistory
		: searchHistory.slice(0, 1);

	useEffect(() => {
		function handleClickOutside(event) {
			if (optionsRef.current && !optionsRef.current.contains(event.target)) {
				setShowOptions(null);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [setShowOptions]);

	const handleEllipsisClick = (id) => {
		setShowOptions(showOptions === id ? null : id);
	};

	return (
		<div className="mt-4">
			<h2 className="text-sm mb-2">Search History</h2>
			<div className="bg-white border-2 rounded-lg relative">
				{visibleHistory.map((item) => (
					<div
						key={item.id}
						className="flex justify-between items-center hover:bg-[#F5F2FE] rounded-lg px-6 py-4 relative"
					>
						<div>
							<h1 className="font-medium">{item.title}</h1>
							<h2 className="text-sm">{item.date}</h2>
						</div>
						<div className="flex gap-3">
							<ArrowUpRightFromSquare size={20} />
							<div className="relative">
								<Ellipsis
									size={20}
									onClick={() => handleEllipsisClick(item.id)}
									className="cursor-pointer"
								/>
								{showOptions === item.id && (
									<div
										ref={optionsRef}
										className="absolute right-0 mt-2 bg-white shadow-md border rounded-lg w-48 z-10"
									>
										<button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full">
											<Share2 size={18} />
											<span>Share</span>
										</button>
										<button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full">
											<Edit size={18} />
											<span>Rename</span>
										</button>
										<button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full">
											<Archive size={18} />
											<span>Archive</span>
										</button>
										<button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full">
											<Trash size={18} />
											<span>Delete</span>
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
				))}
				<hr />
				<button
					onClick={() => setShowAllHistory(!showAllHistory)}
					className="w-full text-zinc-600 p-3 font-medium text-sm hover:underline"
				>
					{showAllHistory ? "Show Less" : "Show More"}
				</button>
			</div>
		</div>
	);
}

export default SearchHistory;
