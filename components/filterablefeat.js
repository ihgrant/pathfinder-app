import React, {PropTypes} from 'react';
var PlusIcon = require('./plusicon');

function FilterableFeat(props) {
	return (
		<li className='p-1e' onClick={props.addFeat} data-id={props.feat.id}>
			<PlusIcon classes='icon-1-5e fill-bluewhite fl-l'/>
			<h3 className='m-t-0'>{props.feat.name}</h3>
			<p className='m-05e italic color-aaa'>
				{props.feat.type + '; ' + (props.feat.prerequisites.length ?
					`Requires ${props.feat.prerequisites}` :
					'No prerequisites')}
			</p>
			<p className='m-b-0'>{props.feat.benefit}</p>
			{props.feat.special.length ? <p className='m-b-0'>{props.feat.special}</p> : null}
		</li>
	);
}

FilterableFeat.propTypes = {
	addFeat: PropTypes.func.isRequired,
	feat: PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		prerequisites: PropTypes.string.isRequired,
		benefit: PropTypes.string.isRequired,
		special: PropTypes.string.isRequired
	}).isRequired
};

module.exports = FilterableFeat;
