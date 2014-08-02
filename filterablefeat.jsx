/**
 * @jsx React.DOM
 */

var React = require('react');
var PlusIcon = require('./plusicon.jsx');

var FilterableFeat = React.createClass({
	render: function () {
		var text = [
			<p className="m-b-0">{this.props.feat.benefit}</p>,
			(this.props.feat.special.length ? <p className="m-b-0">{this.props.feat.special}</p> : null)
		];
		return (
			<li className="p-1e" onClick={this.props.addFeat} data-name={this.props.feat.name}>
				<PlusIcon classes="icon-1-5e fill-bluewhite fl-l"/><h3 className="m-t-0">{this.props.feat.name}</h3>
				<p className="m-05e italic color-aaa">{this.props.feat.type}</p>
				{text}
			</li>
		);
	}
});

module.exports = FilterableFeat;
