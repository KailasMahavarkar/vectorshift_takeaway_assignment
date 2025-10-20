export const DEFAULT_NODE_STYLE = {
	width: 200,
	height: 80,
	border: "1px solid black",
	background: "white",
	padding: "8px",
	borderRadius: "3px",
};

export const mergeNodeStyles = (customStyle = {}) => ({
	...DEFAULT_NODE_STYLE,
	...customStyle,
});

export const HEADER_STYLE = {
	fontWeight: "bold",
	marginBottom: "8px",
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
};

export const FIELDS_CONTAINER_STYLE = {
	fontSize: "12px",
};
