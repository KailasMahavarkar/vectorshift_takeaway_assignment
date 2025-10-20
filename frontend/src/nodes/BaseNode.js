import { useState } from "react";
import { Handle, useReactFlow } from "reactflow";
import { getFieldRenderer } from "./utils/fieldRenderers";
import { initializeFieldStates, createFieldChangeHandler } from "./utils/stateHelpers";
import { getHandleId, getHandlePosition, getHandleStyle } from "./utils/handleHelpers";

export const BaseNode = ({ id, data, config }) => {
	const { title = "Node", fields = [], handles = [], style = {} } = config;
	const { deleteElements } = useReactFlow();
	const [fieldStates, setFieldStates] = useState(() => initializeFieldStates(fields, data));

	const handleDelete = () => {
		deleteElements({ nodes: [{ id }] });
	};

	const renderField = (field) => {
		const renderer = getFieldRenderer(field.type);
		if (!renderer) return null;

		const value = fieldStates[field.name];
		const onChange = createFieldChangeHandler(field.name, setFieldStates);

		return field.type === "static" ? renderer(field) : renderer(field, value, onChange);
	};

	const nodeClasses = "card bg-base-100 shadow-xl border-2 border-base-300 hover:border-primary transition-all duration-200";
	const defaultStyle = {
		width: style.width || 200,
		minHeight: style.height || 80,
		...style,
	};

	return (
		<div className={nodeClasses} style={defaultStyle}>
			{handles.map((handle, index) => (
				<Handle
					key={getHandleId(handle, id, index)}
					type={handle.type}
					position={getHandlePosition(handle)}
					id={getHandleId(handle, id, index)}
					style={getHandleStyle(handle)}
				/>
			))}

			<div className="card-body p-3 gap-2">
				<div className="flex items-center justify-between">
					<h3 className="card-title text-sm m-0">{title}</h3>
					<button
						onClick={handleDelete}
						className="btn btn-circle btn-xs btn-error btn-outline"
						title="Delete node"
					>
						✕
					</button>
				</div>

				<div className="space-y-2">{fields.map((field) => renderField(field))}</div>
			</div>
		</div>
	);
};
