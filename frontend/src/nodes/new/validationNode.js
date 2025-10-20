import { Position } from "reactflow";
import { createNode } from "../nodeFactory";

const validationNodeConfig = {
	title: "Validation",
	fields: [
		{
			name: "validationType",
			type: "select",
			label: "Type",
			defaultValue: "email",
			options: [
				{ value: "email", label: "Email" },
				{ value: "url", label: "URL" },
				{ value: "phone", label: "Phone Number" },
				{ value: "number", label: "Number" },
				{ value: "date", label: "Date" },
				{ value: "custom", label: "Custom Regex" },
			],
		},
		{
			name: "customPattern",
			type: "text",
			label: "Pattern",
			defaultValue: "",
			placeholder: "Custom regex pattern...",
		},
		{
			name: "errorMessage",
			type: "text",
			label: "Error Msg",
			defaultValue: "Validation failed",
			placeholder: "Error message...",
		},
	],
	handles: [
		{
			type: "target",
			position: Position.Left,
			id: "input",
		},
		{
			type: "source",
			position: Position.Right,
			id: "valid",
			style: { top: "40%" },
		},
		{
			type: "source",
			position: Position.Right,
			id: "invalid",
			style: { top: "70%" },
		},
	],
	style: {
		width: 240,
		minHeight: 180,
	},
};

export const ValidationNode = createNode(validationNodeConfig);

