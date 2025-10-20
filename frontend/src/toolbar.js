import { DraggableNode } from "./draggableNode";
import { SubmitButton } from "./submit";

export const PipelineToolbar = () => {
	return (
		<div className="bg-base-200 p-4 border-b-2 border-base-300">
			<div className="flex items-center justify-between gap-4">
				<div className="flex flex-wrap gap-3 flex-1">
					<DraggableNode type="customInput" label="Input" />
					<DraggableNode type="llm" label="LLM" />
					<DraggableNode type="customOutput" label="Output" />
					<DraggableNode type="text" label="Text" />
					<DraggableNode type="filter" label="Filter" />
					<DraggableNode type="merge" label="Merge" />
					<DraggableNode type="api" label="API" />
					<DraggableNode type="database" label="Database" />
					<DraggableNode type="validation" label="Validation" />
				</div>
				<SubmitButton />
			</div>
		</div>
	);
};
