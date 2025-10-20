import { Position } from "reactflow";
import { createNode } from "../nodeFactory";

const mergeNodeConfig = {
	title: "Merge",
	fields: [
		{
			name: "strategy",
			type: "select",
			label: "Strategy",
			defaultValue: "concat",
			options: [
				{ value: "concat", label: "Concatenate" },
				{ value: "join", label: "Join with Delimiter" },
				{ value: "array", label: "Create Array" },
				{ value: "object", label: "Create Object" },
			],
		},
		{
			name: "delimiter",
			type: "text",
			label: "Delimiter",
			defaultValue: ", ",
			placeholder: 'e.g., ", "',
		},
	],
	handles: [
		{
			type: "target",
			position: Position.Left,
			id: "input1",
			style: { top: "33%" },
		},
		{
			type: "target",
			position: Position.Left,
			id: "input2",
			style: { top: "66%" },
		},
		{
			type: "source",
			position: Position.Right,
			id: "output",
		},
	],
	style: {
		width: 240,
		minHeight: 150,
	},
};

export const MergeNode = createNode(mergeNodeConfig);

