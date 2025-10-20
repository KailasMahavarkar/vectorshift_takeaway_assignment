import { useState, useEffect, useRef } from "react";
import { Handle, Position, useReactFlow } from "reactflow";

export const TextNode = ({ id, data }) => {
	const { deleteElements } = useReactFlow();
	const [text, setText] = useState(data?.text || "{{input}}");
	const [variables, setVariables] = useState([]);
	const textareaRef = useRef(null);

	useEffect(() => {
		const regex = /\{\{(\w+)\}\}/g;
		const matches = [...text.matchAll(regex)];
		const uniqueVars = [...new Set(matches.map((match) => match[1]))];
		setVariables(uniqueVars);
	}, [text]);

	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto";
			textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
		}
	}, [text]);

	const handleDelete = () => {
		deleteElements({ nodes: [{ id }] });
	};

	const handleTextChange = (e) => {
		setText(e.target.value);
	};

	const nodeWidth = Math.max(250, Math.min(500, text.length * 8));

	return (
		<div
			className="card bg-base-100 shadow-xl border-2 border-base-300 hover:border-primary transition-all duration-200"
			style={{ width: nodeWidth, minHeight: 120 }}
		>
			{variables.map((variable, index) => (
				<Handle
					key={`var-${variable}`}
					type="target"
					position={Position.Left}
					id={variable}
					style={{
						top: 50 + (index * 20),
						background: "#555",
					}}
				>
					<div
						className="absolute right-full mr-2 text-xs whitespace-nowrap bg-base-300 px-2 py-0.5 rounded"
						style={{ transform: "translateY(-50%)" }}
					>
						{variable}
					</div>
				</Handle>
			))}

			<Handle type="source" position={Position.Right} id="output" />

			<div className="card-body p-3 gap-2">
				<div className="flex items-center justify-between">
					<h3 className="card-title text-sm m-0">Text</h3>
					<button
						onClick={handleDelete}
						className="btn btn-circle btn-xs btn-error btn-outline"
						title="Delete node"
					>
						✕
					</button>
				</div>

				<div className="form-control w-full">
					<label className="label py-0 pb-1">
						<span className="label-text text-xs font-medium">Text</span>
					</label>
					<textarea
						ref={textareaRef}
						value={text}
						onChange={handleTextChange}
						placeholder="Type {{variableName}} to create inputs"
						className="textarea textarea-bordered textarea-sm w-full text-xs leading-tight resize-none overflow-hidden"
						rows={1}
					/>
					{variables.length > 0 && (
						<label className="label py-1">
							<span className="label-text-alt text-xs text-base-content/60">
								Variables: {variables.join(", ")}
							</span>
						</label>
					)}
				</div>
			</div>
		</div>
	);
};
