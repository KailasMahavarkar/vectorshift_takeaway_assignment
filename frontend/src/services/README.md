# API Services

This directory contains all API service modules for communicating with the backend.

## Structure

```
services/
├── api.js          # Main axios instance and pipeline services
└── README.md       # This file
```

## Usage

### Import the service

```javascript
import { pipelineService } from './services/api';
```

### Available Services

#### `pipelineService.parsePipeline(pipelineData)`

Sends pipeline data to backend for analysis.

**Parameters:**
- `pipelineData`: Object containing nodes and edges

**Returns:**
```javascript
{
  num_nodes: number,
  num_edges: number,
  is_dag: boolean
}
```

**Example:**
```javascript
const pipeline = {
  nodes: [{ id: 'node1', type: 'input', position: {x: 0, y: 0}, data: {} }],
  edges: [{ source: 'node1', target: 'node2' }]
};

try {
  const result = await pipelineService.parsePipeline(pipeline);
  console.log('Analysis:', result);
} catch (error) {
  console.error('Error:', error.message);
}
```

#### `pipelineService.healthCheck()`

Checks if backend is responding.

**Returns:**
```javascript
{ Ping: 'Pong' }
```

## Configuration

Set the backend URL via environment variable:

```bash
REACT_APP_API_URL=http://localhost:8000
```

Default: `http://localhost:8000`

## Features

### Interceptors

**Request Interceptor:**
- Logs all outgoing requests
- Automatically adds headers

**Response Interceptor:**
- Logs successful responses
- Enhanced error handling with specific error messages
- Network error detection
- Timeout handling

### Error Handling

The service provides detailed error messages:

- **Network errors**: "Network error - make sure backend is running..."
- **Timeout errors**: "Request timeout - backend may be slow..."
- **Server errors**: "Server error: 500 - ..."
- **Generic errors**: Fallback error messages

### Timeout

Default request timeout: 10 seconds

## Adding New Services

To add a new API endpoint:

```javascript
export const pipelineService = {
  // ... existing methods
  
  newMethod: async (data) => {
    try {
      const response = await apiClient.post('/new-endpoint', data);
      return response.data;
    } catch (error) {
      // Handle specific errors
      throw new Error('Custom error message');
    }
  }
};
```

