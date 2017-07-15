import React, {PropTypes} from 'react';

function ClassRadio(props) {
	return (
		<label className='p-05e' htmlFor={props.name}>
			<input
				defaultChecked={props.defaultChecked}
				id={props.name}
				name={props.name}
				onChange={props.onChange}
				type='radio'
				value={props.value} />
			{props.name}
		</label>
	);
}

ClassRadio.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.string,
	defaultChecked: PropTypes.bool,
	onChange: PropTypes.func
};

module.exports = ClassRadio;
