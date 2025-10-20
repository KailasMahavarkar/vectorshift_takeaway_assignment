import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

const apiClient = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
	timeout: 10000,
});

apiClient.interceptors.request.use(
	(config) => {
		console.log(`Making ${config.method.toUpperCase()} request to ${config.url}`);
		return config;
	},
	(error) => {
		console.error("Request error:", error);
		return Promise.reject(error);
	}
);

apiClient.interceptors.response.use(
	(response) => {
		console.log("Response received:", response.data);
		return response;
	},
	(error) => {
		if (error.response) {
			console.error("Server error:", error.response.status, error.response.data);
		} else if (error.request) {
			console.error("No response received:", error.request);
		} else {
			console.error("Request setup error:", error.message);
		}
		return Promise.reject(error);
	}
);

export const pipelineService = {
	parsePipeline: async (pipelineData) => {
		try {
			const response = await apiClient.post("/pipelines/parse", pipelineData);
			return response.data;
		} catch (error) {
			if (error.code === "ECONNABORTED") {
				throw new Error("Request timeout - backend may be slow or unresponsive");
			} else if (error.code === "ERR_NETWORK") {
				throw new Error("Network error - make sure backend is running on http://localhost:8000");
			} else if (error.response) {
				throw new Error(`Server error: ${error.response.status} - ${error.response.data.detail || "Unknown error"}`);
			} else {
				throw new Error(error.message || "Failed to connect to backend");
			}
		}
	},

	healthCheck: async () => {
		try {
			const response = await apiClient.get("/");
			return response.data;
		} catch (error) {
			throw new Error("Backend health check failed");
		}
	},
};

export default apiClient;

