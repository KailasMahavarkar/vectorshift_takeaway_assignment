// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from "react";
import ReactFlow, { Controls, Background, MiniMap, MarkerType } from "reactflow";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import {
	InputNode,
	LLMNode,
	OutputNode,
	TextNode,
	FilterNode,
	MergeNode,
	APINode,
	DatabaseNode,
	ValidationNode,
} from "./nodes";

import "reactflow/dist/style.css";

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
	customInput: InputNode,
	llm: LLMNode,
	customOutput: OutputNode,
	text: TextNode,
	filter: FilterNode,
	merge: MergeNode,
	api: APINode,
	database: DatabaseNode,
	validation: ValidationNode,
};

const selector = (state) => ({
	nodes: state.nodes,
	edges: state.edges,
	getNodeID: state.getNodeID,
	addNode: state.addNode,
	onNodesChange: state.onNodesChange,
	onEdgesChange: state.onEdgesChange,
	onConnect: state.onConnect,
});

export const PipelineUI = () => {
	const reactFlowWrapper = useRef(null);
	const [reactFlowInstance, setReactFlowInstance] = useState(null);
	const { nodes, edges, getNodeID, addNode, onNodesChange, onEdgesChange, onConnect } = useStore(
		selector,
		shallow
	);

	const getInitNodeData = (nodeID, type) => {
		let nodeData = { id: nodeID, nodeType: `${type}` };
		return nodeData;
	};

	const onDrop = useCallback(
		(event) => {
			event.preventDefault();

			const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
			if (event?.dataTransfer?.getData("application/reactflow")) {
				const appData = JSON.parse(event.dataTransfer.getData("application/reactflow"));
				const type = appData?.nodeType;

				// check if the dropped element is valid
				if (typeof type === "undefined" || !type) {
					return;
				}

				const position = reactFlowInstance.project({
					x: event.clientX - reactFlowBounds.left,
					y: event.clientY - reactFlowBounds.top,
				});

				const nodeID = getNodeID(type);
				const newNode = {
					id: nodeID,
					type,
					position,
					data: getInitNodeData(nodeID, type),
				};

				addNode(newNode);
			}
		},
		[reactFlowInstance]
	);

	const onDragOver = useCallback((event) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = "move";
	}, []);

	const onEdgeClick = useCallback((event, edge) => {
		event.stopPropagation();
		if (window.confirm("Delete this connection?")) {
			onEdgesChange([{ type: "remove", id: edge.id }]);
		}
	}, [onEdgesChange]);

	const defaultEdgeOptions = {
		type: "smoothstep",
		animated: true,
		style: { strokeWidth: 2, stroke: "#b1b1b7" },
		markerEnd: { type: MarkerType.Arrow, width: 20, height: 20 },
	};

	return (
		<>
			<div ref={reactFlowWrapper} className="w-full h-[70vh]">
				<ReactFlow
					nodes={nodes}
					edges={edges}
					onNodesChange={onNodesChange}
					onEdgesChange={onEdgesChange}
					onConnect={onConnect}
					onEdgeClick={onEdgeClick}
					onDrop={onDrop}
					onDragOver={onDragOver}
					onInit={setReactFlowInstance}
					nodeTypes={nodeTypes}
					proOptions={proOptions}
					snapGrid={[gridSize, gridSize]}
					connectionLineType="smoothstep"
					defaultEdgeOptions={defaultEdgeOptions}
					deleteKeyCode={["Backspace", "Delete"]}
				>
					<Background color="#aaa" gap={gridSize} />
					<Controls />
					<MiniMap />
				</ReactFlow>
			</div>
		</>
	);
};
