export const initializeFieldStates = (fields, data) => {
	const initialState = {};

	fields.forEach((field) => {
		const dataKey = field.name;
		initialState[field.name] = data?.[dataKey] ?? field.defaultValue ?? "";
	});

	return initialState;
};

export const createFieldChangeHandler = (fieldName, setFieldStates) => (e) => {
	setFieldStates((prev) => ({
		...prev,
		[fieldName]: e.target.value,
	}));
};
