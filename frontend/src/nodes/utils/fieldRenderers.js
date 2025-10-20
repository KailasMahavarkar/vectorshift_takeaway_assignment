import React from "react";

export const renderTextField = (field, value, onChange) => {
	const { name, label, placeholder } = field;

	return (
		<div key={name} className="form-control w-full">
			<label className="label py-0 pb-1">
				<span className="label-text text-xs font-medium">{label}</span>
			</label>
			<input
				type="text"
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				className="input input-bordered input-sm w-full text-xs h-7"
			/>
		</div>
	);
};

export const renderSelectField = (field, value, onChange) => {
	const { name, label, options } = field;

	return (
		<div key={name} className="form-control w-full">
			<label className="label py-0 pb-1">
				<span className="label-text text-xs font-medium">{label}</span>
			</label>
			<select 
				value={value} 
				onChange={onChange} 
				className="select select-bordered select-sm w-full text-xs h-7 min-h-0"
			>
				{options?.map((opt) => (
					<option key={opt.value} value={opt.value}>
						{opt.label}
					</option>
				))}
			</select>
		</div>
	);
};

export const renderTextareaField = (field, value, onChange) => {
	const { name, label, placeholder, rows } = field;

	return (
		<div key={name} className="form-control w-full">
			<label className="label py-0 pb-1">
				<span className="label-text text-xs font-medium">{label}</span>
			</label>
			<textarea
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				rows={rows || 2}
				className="textarea textarea-bordered textarea-sm w-full text-xs leading-tight py-1"
			/>
		</div>
	);
};

export const renderStaticField = (field) => {
	const { name, content } = field;

	return (
		<div key={name} className="text-xs text-base-content/70 py-1">
			<span>{content}</span>
		</div>
	);
};

export const getFieldRenderer = (type) => {
	const renderers = {
		text: renderTextField,
		select: renderSelectField,
		textarea: renderTextareaField,
		static: renderStaticField,
	};

	return renderers[type] || null;
};
