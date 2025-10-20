export const DraggableNode = ({ type, label }) => {
	const onDragStart = (event, nodeType) => {
		const appData = { nodeType };
		event.target.style.cursor = "grabbing";
		event.dataTransfer.setData("application/reactflow", JSON.stringify(appData));
		event.dataTransfer.effectAllowed = "move";
	};

	return (
		<div
			className="btn btn-outline btn-sm cursor-grab hover:btn-primary hover:scale-105 transition-all duration-200 normal-case"
			onDragStart={(event) => onDragStart(event, type)}
			onDragEnd={(event) => (event.target.style.cursor = "grab")}
			draggable
		>
			<span className="font-medium text-xs">{label}</span>
		</div>
	);
};
