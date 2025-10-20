import { useState } from "react";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import { pipelineService } from "./services/api";

const selector = (state) => ({
	nodes: state.nodes,
	edges: state.edges,
});

export const SubmitButton = () => {
	const { nodes, edges } = useStore(selector, shallow);
	const [showModal, setShowModal] = useState(false);
	const [pipelineData, setPipelineData] = useState(null);
	const [backendResponse, setBackendResponse] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleSubmit = async () => {
		setLoading(true);
		setError(null);

		const pipeline = {
			nodes: nodes.map((node) => ({
				id: node.id,
				type: node.type,
				position: node.position,
				data: node.data,
			})),
			edges: edges.map((edge) => ({
				source: edge.source,
				target: edge.target,
				sourceHandle: edge.sourceHandle,
				targetHandle: edge.targetHandle,
			})),
		};

		setPipelineData(pipeline);

		try {
			const data = await pipelineService.parsePipeline(pipeline);
			setBackendResponse(data);
			setShowModal(true);
		} catch (err) {
			console.error("Error submitting pipeline:", err);
			setError(err.message);
			alert(`Error: ${err.message}`);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<button onClick={handleSubmit} className="btn btn-primary" disabled={loading}>
				{loading ? (
					<>
						<span className="loading loading-spinner loading-sm"></span>
						Submitting...
					</>
				) : (
					"Submit Pipeline"
				)}
			</button>

			{showModal && backendResponse && (
				<div className="modal modal-open">
					<div className="modal-box max-w-4xl">
						<h3 className="font-bold text-lg mb-4">Pipeline Analysis Results</h3>

						<div className="alert alert-info mb-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								className="stroke-current shrink-0 w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								></path>
							</svg>
							<div>
								<h3 className="font-bold">Backend Analysis Complete!</h3>
								<div className="text-xs">Pipeline validated and analyzed successfully</div>
							</div>
						</div>

						<div className="stats stats-vertical lg:stats-horizontal shadow mb-4 w-full">
							<div className="stat">
								<div className="stat-figure text-primary">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										className="inline-block w-8 h-8 stroke-current"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
										></path>
									</svg>
								</div>
								<div className="stat-title">Total Nodes</div>
								<div className="stat-value text-primary">{backendResponse.num_nodes}</div>
								<div className="stat-desc">Pipeline components</div>
							</div>

							<div className="stat">
								<div className="stat-figure text-secondary">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										className="inline-block w-8 h-8 stroke-current"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M13 10V3L4 14h7v7l9-11h-7z"
										></path>
									</svg>
								</div>
								<div className="stat-title">Total Connections</div>
								<div className="stat-value text-secondary">{backendResponse.num_edges}</div>
								<div className="stat-desc">Edge connections</div>
							</div>

							<div className="stat">
								<div className={`stat-figure ${backendResponse.is_dag ? "text-success" : "text-error"}`}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										className="inline-block w-8 h-8 stroke-current"
									>
										{backendResponse.is_dag ? (
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
											></path>
										) : (
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
											></path>
										)}
									</svg>
								</div>
								<div className="stat-title">Graph Status</div>
								<div className={`stat-value ${backendResponse.is_dag ? "text-success" : "text-error"}`}>
									{backendResponse.is_dag ? "Valid DAG" : "Not DAG"}
								</div>
								<div className="stat-desc">
									{backendResponse.is_dag ? "No cycles detected ✓" : "Contains cycles ✗"}
								</div>
							</div>
						</div>

						{!backendResponse.is_dag && (
							<div className="alert alert-warning mb-4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="stroke-current shrink-0 h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
									/>
								</svg>
								<div>
									<h3 className="font-bold">Warning: Pipeline contains cycles!</h3>
									<div className="text-sm">
										A valid pipeline should be a Directed Acyclic Graph (DAG) without circular dependencies.
									</div>
								</div>
							</div>
						)}

						<div className="mb-4">
							<h4 className="font-semibold mb-2">Full Pipeline Data:</h4>
							<div className="mockup-code max-h-64 overflow-auto">
								<pre className="text-xs">
									<code>{JSON.stringify(pipelineData, null, 2)}</code>
								</pre>
							</div>
						</div>

						<div className="modal-action">
							<button
								className="btn btn-outline"
								onClick={() => {
									const fullData = {
										pipeline: pipelineData,
										analysis: backendResponse,
									};
									navigator.clipboard.writeText(JSON.stringify(fullData, null, 2));
									alert("Copied to clipboard!");
								}}
							>
								Copy All Data
							</button>
							<button className="btn" onClick={() => setShowModal(false)}>
								Close
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
