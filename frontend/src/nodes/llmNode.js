import { Position } from "reactflow";
import { createNode } from "./nodeFactory";

const llmNodeConfig = {
	title: "LLM",
	fields: [
		{
			name: "model",
			type: "select",
			label: "Model",
			defaultValue: "gpt-4",
			options: [
				{ value: "gpt-4", label: "GPT-4" },
				{ value: "gpt-4-turbo", label: "GPT-4 Turbo" },
				{ value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
				{ value: "claude-3-opus", label: "Claude 3 Opus" },
				{ value: "claude-3-sonnet", label: "Claude 3 Sonnet" },
			],
		},
		{
			name: "temperature",
			type: "select",
			label: "Temperature",
			defaultValue: "0.7",
			options: [
				{ value: "0", label: "0 (Deterministic)" },
				{ value: "0.3", label: "0.3 (Focused)" },
				{ value: "0.7", label: "0.7 (Balanced)" },
				{ value: "1.0", label: "1.0 (Creative)" },
				{ value: "1.5", label: "1.5 (Very Creative)" },
			],
		},
		{
			name: "maxTokens",
			type: "text",
			label: "Max Tokens",
			defaultValue: "2048",
			placeholder: "2048",
		},
		{
			name: "systemPrompt",
			type: "textarea",
			label: "System Prompt",
			defaultValue: "You are a helpful assistant.",
			placeholder: "Enter system instructions...",
			rows: 2,
		},
	],
	handles: [
		{
			type: "target",
			position: Position.Left,
			id: "system",
			style: { top: "33%" },
		},
		{
			type: "target",
			position: Position.Left,
			id: "prompt",
			style: { top: "66%" },
		},
		{
			type: "source",
			position: Position.Right,
			id: "response",
		},
	],
	style: {
		width: 260,
		minHeight: 220,
	},
};

export const LLMNode = createNode(llmNodeConfig);
