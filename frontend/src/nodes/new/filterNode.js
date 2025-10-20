import { Position } from "reactflow";
import { createNode } from "../nodeFactory";

const filterNodeConfig = {
	title: "Filter",
	fields: [
		{
			name: "condition",
			type: "select",
			label: "Condition",
			defaultValue: "contains",
			options: [
				{ value: "contains", label: "Contains" },
				{ value: "equals", label: "Equals" },
				{ value: "startsWith", label: "Starts With" },
				{ value: "endsWith", label: "Ends With" },
				{ value: "regex", label: "Regex Match" },
			],
		},
		{
			name: "filterValue",
			type: "text",
			label: "Value",
			defaultValue: "",
			placeholder: "Filter value...",
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
			id: "output",
		},
	],
	style: {
		width: 220,
		minHeight: 140,
	},
};

export const FilterNode = createNode(filterNodeConfig);

