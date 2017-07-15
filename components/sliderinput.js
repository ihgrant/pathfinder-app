import React, {PropTypes} from 'react';

function SliderInput(props) {
	return (
		<div>
			<label htmlFor={props.name}>
				<input id={props.name}
					name={props.name}
					type='range'
					min={props.min}
					max={props.max}
					defaultValue={props.defaultValue}
					onChange={props.handleChange} />
				{props.label || props.name}
			</label>
		</div>
	);
}

SliderInput.propTypes = {
	defaultValue: PropTypes.number,
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	min: PropTypes.number.isRequired,
	max: PropTypes.number.isRequired,
	handleChange: PropTypes.func
}

module.exports = SliderInput;
