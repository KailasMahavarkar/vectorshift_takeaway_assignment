import { Position } from "reactflow";

export const getHandleId = (handle, id, index) => {
	return handle.id || `${id}-${handle.type}-${index}`;
};

export const getHandlePosition = (handle) => {
	return handle.position || Position.Right;
};

export const getHandleStyle = (handle) => {
	return handle.style || {};
};
