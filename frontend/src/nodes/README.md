# Node Abstraction System

## Overview

This abstraction system eliminates code duplication across node components by separating configuration from implementation. New nodes can be created with ~15 lines of config instead of ~50 lines of component code.

## Architecture

### Core Components

-   `BaseNode.js` - Main rendering component that consumes configuration objects
-   `nodeFactory.js` - Factory function that creates React components from configs
-   `index.js` - Centralized export point for all nodes

### Utilities (`utils/`)

-   `fieldRenderers.js` - Field type rendering logic (text, select, textarea, static)
-   `nodeStyles.js` - Style constants and merging utilities
-   `stateHelpers.js` - State initialization and change handlers
-   `handleHelpers.js` - Handle configuration utilities

### New Nodes (`new/`)
-   All newly added nodes are added here, for reference!

## Creating a New Node

```javascript
import { Position } from "reactflow";
import { createNode } from "./nodeFactory";

const myNodeConfig = {
	title: "My Node",
	fields: [
		{
			name: "fieldName",
			type: "text",
			label: "Label",
			defaultValue: "default",
			placeholder: "Enter value...",
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
		width: 200,
		height: 100,
		background: "#e3f2fd",
	},
};

export const MyNode = createNode(myNodeConfig);
```

## Field Types

-   `text` - Text input field
-   `select` - Dropdown with options array
-   `textarea` - Multi-line text input with rows
-   `static` - Read-only content display

## Handle Configuration

Handles support custom positioning via style objects:

```javascript
{
  type: 'target',
  position: Position.Left,
  id: 'input1',
  style: { top: '33%' }
}
```

## Style Customization

Override default styles via the style object:

```javascript
style: {
  width: 220,
  height: 140,
  background: '#e8f5e9',
  border: '2px solid green'
}
```

## Current Nodes

### Existing (Refactored)

-   InputNode
-   OutputNode
-   LLMNode
-   TextNode

### New Demonstrations

-   FilterNode - Data filtering with conditions
-   MergeNode - Multiple input merging strategies
-   APINode - HTTP request configuration
-   DatabaseNode - Database query interface
-   ValidationNode - Input validation rules
