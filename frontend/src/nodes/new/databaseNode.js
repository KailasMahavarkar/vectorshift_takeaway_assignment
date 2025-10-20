import { Position } from "reactflow";
import { createNode } from "../nodeFactory";

const databaseNodeConfig = {
	title: "Database Query",
	fields: [
		{
			name: "dbType",
			type: "select",
			label: "Type",
			defaultValue: "postgres",
			options: [
				{ value: "postgres", label: "PostgreSQL" },
				{ value: "mysql", label: "MySQL" },
				{ value: "mongodb", label: "MongoDB" },
				{ value: "redis", label: "Redis" },
			],
		},
		{
			name: "query",
			type: "textarea",
			label: "Query",
			defaultValue: "SELECT * FROM users",
			placeholder: "Enter SQL query...",
			rows: 3,
		},
	],
	handles: [
		{
			type: "target",
			position: Position.Left,
			id: "connection",
		},
		{
			type: "source",
			position: Position.Right,
			id: "results",
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
		width: 260,
		minHeight: 180,
	},
};

export const DatabaseNode = createNode(databaseNodeConfig);

