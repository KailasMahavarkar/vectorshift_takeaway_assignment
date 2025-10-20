from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    data: Dict[str, Any]

class Edge(BaseModel):
    source: str
    target: str
    sourceHandle: str = None
    targetHandle: str = None

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    """
    Check if the graph formed by nodes and edges is a Directed Acyclic Graph (DAG).
    Uses DFS with recursion stack to detect cycles.
    """
    if not nodes:
        return True
    
    # Build adjacency list
    graph = {node.id: [] for node in nodes}
    for edge in edges:
        if edge.source in graph:
            graph[edge.source].append(edge.target)
    
    # Track visited nodes and recursion stack
    visited = set()
    rec_stack = set()
    
    def has_cycle(node_id: str) -> bool:
        visited.add(node_id)
        rec_stack.add(node_id)
        
        # Check all neighbors
        for neighbor in graph.get(node_id, []):
            if neighbor not in visited:
                if has_cycle(neighbor):
                    return True
            elif neighbor in rec_stack:
                # Found a back edge (cycle)
                return True
        
        rec_stack.remove(node_id)
        return False
    
    # Check for cycles starting from each unvisited node
    for node in nodes:
        if node.id not in visited:
            if has_cycle(node.id):
                return False
    
    return True

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    
    # Validate edge references
    node_ids = {node.id for node in pipeline.nodes}
    for edge in pipeline.edges:
        if edge.source not in node_ids:
            raise HTTPException(
                status_code=400, 
                detail=f"Invalid edge: source node '{edge.source}' does not exist"
            )
        if edge.target not in node_ids:
            raise HTTPException(
                status_code=400, 
                detail=f"Invalid edge: target node '{edge.target}' does not exist"
            )
    
    dag_status = is_dag(pipeline.nodes, pipeline.edges)
    
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': dag_status
    }
