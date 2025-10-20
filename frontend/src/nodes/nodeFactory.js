import { BaseNode } from "./BaseNode";

export const createNode = (config) => {
	return ({ id, data }) => {
		return <BaseNode id={id} data={data} config={config} />;
	};
};

export const createHandle = (type, position, id, style = {}) => ({
	type,
	position,
	id,
	style,
});

export const createField = (name, type, label, options = {}) => ({
	name,
	type,
	label,
	...options,
});
