import { Position } from "reactflow";
import { createNode } from "./nodeFactory";

const inputNodeConfig = {
	title: "Input",
	fields: [
		{
			name: "inputName",
			type: "text",
			label: "Name",
			defaultValue: "input_",
		},
		{
			name: "inputType",
			type: "select",
			label: "Type",
			defaultValue: "Text",
			options: [
				{ value: "Text", label: "Text" },
				{ value: "File", label: "File" },
			],
		},
	],
	handles: [
		{
			type: "source",
			position: Position.Right,
			id: "value",
		},
	],
	style: {
		width: 220,
		minHeight: 140,
	},
};

export const InputNode = createNode(inputNodeConfig);
