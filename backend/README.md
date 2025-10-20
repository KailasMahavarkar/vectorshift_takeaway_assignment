# Backend API

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the Server

```bash
uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`

## Endpoints

### `GET /`
Health check endpoint

**Response:**
```json
{"Ping": "Pong"}
```

### `POST /pipelines/parse`
Parse and analyze a pipeline graph

**Request Body:**
```json
{
  "nodes": [
    {
      "id": "string",
      "type": "string",
      "position": {"x": 0, "y": 0},
      "data": {}
    }
  ],
  "edges": [
    {
      "source": "string",
      "target": "string",
      "sourceHandle": "string",
      "targetHandle": "string"
    }
  ]
}
```

**Response:**
```json
{
  "num_nodes": 5,
  "num_edges": 4,
  "is_dag": true
}
```

## DAG Detection

The backend implements cycle detection using Depth-First Search (DFS) with a recursion stack to determine if the pipeline forms a valid Directed Acyclic Graph (DAG).

A pipeline is a valid DAG if:
- It has no circular dependencies
- All edges flow in one direction
- No node can reach itself through any path

