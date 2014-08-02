/**
 * @jsx React.DOM
 */

var React = require('react');
var DeleteIcon = require('./deleteicon.jsx');

var ChosenFeat = React.createClass({
	render: function () {
		return (
			<li className="bg-bluewhite">
				<DeleteIcon classes="icon-1-5e fill-bluewhite fl-l"/>
				<p>
					<span className="bold">{this.props.feat.name}</span>
					{this.props.feat.description}
				</p>
			</li>
		);
	}
});

module.exports = ChosenFeat;
