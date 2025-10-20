import { Position } from "reactflow";
import { createNode } from "./nodeFactory";

const textNodeConfig = {
	title: "Text",
	fields: [
		{
			name: "text",
			type: "text",
			label: "Text",
			defaultValue: "{{input}}",
			placeholder: "Enter text...",
		},
	],
	handles: [
		{
			type: "source",
			position: Position.Right,
			id: "output",
		},
	],
	style: {
		width: 220,
		minHeight: 110,
	},
};

export const TextNode = createNode(textNodeConfig);
