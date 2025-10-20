import { Position } from "reactflow";
import { createNode } from "./nodeFactory";

const llmNodeConfig = {
	title: "LLM",
	fields: [
		{
			name: "description",
			type: "static",
			content: "This is a LLM.",
		},
	],
	handles: [
		{
			type: "target",
			position: Position.Left,
			id: "system",
			style: { top: `${100 / 3}%` },
		},
		{
			type: "target",
			position: Position.Left,
			id: "prompt",
			style: { top: `${200 / 3}%` },
		},
		{
			type: "source",
			position: Position.Right,
			id: "response",
		},
	],
	style: {
		width: 220,
		minHeight: 100,
	},
};

export const LLMNode = createNode(llmNodeConfig);
