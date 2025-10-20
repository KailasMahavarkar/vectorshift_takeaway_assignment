import { Position } from "reactflow";
import { createNode } from "../nodeFactory";

const apiNodeConfig = {
	title: "API Request",
	fields: [
		{
			name: "method",
			type: "select",
			label: "Method",
			defaultValue: "GET",
			options: [
				{ value: "GET", label: "GET" },
				{ value: "POST", label: "POST" },
				{ value: "PUT", label: "PUT" },
				{ value: "DELETE", label: "DELETE" },
				{ value: "PATCH", label: "PATCH" },
			],
		},
		{
			name: "url",
			type: "text",
			label: "URL",
			defaultValue: "https://api.example.com",
			placeholder: "API endpoint...",
		},
		{
			name: "timeout",
			type: "text",
			label: "Timeout (ms)",
			defaultValue: "5000",
			placeholder: "5000",
		},
	],
	handles: [
		{
			type: "target",
			position: Position.Left,
			id: "body",
			style: { top: "40%" },
		},
		{
			type: "target",
			position: Position.Left,
			id: "headers",
			style: { top: "70%" },
		},
		{
			type: "source",
			position: Position.Right,
			id: "response",
			style: { top: "40%" },
		},
		{
			type: "source",
			position: Position.Right,
			id: "error",
			style: { top: "70%" },
		},
	],
	style: {
		width: 240,
		minHeight: 180,
	},
};

export const APINode = createNode(apiNodeConfig);

