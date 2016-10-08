import React from 'react';
var PlusIcon = require('./plusicon');

function FilterableFeat(props) {
	var text = [
		<p className="m-b-0">{props.feat.benefit}</p>,
		(props.feat.special.length ? <p className="m-b-0">{props.feat.special}</p> : null)
	];
	return (
		<li className="p-1e" onClick={props.addFeat} data-id={props.feat.id}>
			<PlusIcon classes="icon-1-5e fill-bluewhite fl-l"/>
			<h3 className="m-t-0">{props.feat.name}</h3>
			<p className="m-05e italic color-aaa">
				{props.feat.type + '; ' + (props.feat.prerequisites.length ?
					`Requires ${props.feat.prerequisites}` :
					'No prerequisites')}
			</p>
			{text}
		</li>
	);
}

module.exports = FilterableFeat;
