# Pipeline Builder

Drag and drop node builder for creating pipelines. Backend checks if its a valid DAG (no cycles).

React + ReactFlow frontend, FastAPI backend.

## Setup

Need Node 16+ and Python 3.8+

Backend:
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Frontend:
```bash
cd frontend
npm install
npm start
```

Frontend on port 3000, backend on 8000.

## How it works

Drag nodes from toolbar to canvas. Connect them by dragging between handles.

Click "Submit" button - it sends the pipeline to backend. Backend validates edges and checks for cycles using DFS.

## Architecture

Made a node abstraction system so I don't have to copy paste code for each node. Just write a config (fields + handles) and pass to `nodeFactory`. Way easier.

Example - LLM node just defines what fields it needs (model, temperature, tokens, etc) and the factory makes the React component.

Using Zustand for state (simpler than Redux). Node field changes sync to global store.

Text node has a cool feature - detects `{{variable}}` syntax and auto-creates input handles for each variable.

## Features

- Drag and drop nodes
- Snap to grid
- Animated connections
- Delete edges by clicking them
- Minimap + zoom controls (ReactFlow provides these)
- Delete nodes with Backspace/Delete key

Using Tailwind + DaisyUI for styling. The results modal shows stats cards.

## API

`GET /` - health check  
`POST /pipelines/parse` - submit pipeline, get back node count, edge count, and is_dag boolean

## DAG validation

Backend uses DFS to detect cycles. 

Build adjacency list from edges → DFS from each unvisited node → if you hit a node already in recursion stack = cycle found.

Also validates that edge source/target nodes actually exist before checking cycles.

## Tech stack

Frontend: React 18, ReactFlow, Zustand, Axios, Tailwind, DaisyUI  
Backend: FastAPI, Pydantic

## Nodes

9 types total:
- Input/Output 
- Text (has the `{{variable}}` detection)
- LLM (model, temperature, tokens, system prompt)
- Filter, Merge, API, Database, Validation

Adding new node = make config object + pass to `createNode()`. See nodes/README.md for examples.

## Notes

Set `REACT_APP_API_URL` if backend is not on localhost:8000

Check subdirectory READMEs for more details.

