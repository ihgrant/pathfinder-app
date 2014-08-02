/**
 * @jsx React.DOM
 */

var React = require('react');

var FilterableSpell = React.createClass({
	render: function () {
		return (
			<li className="p-1e">
				<h3 className="m-t-0">{this.props.item.name}</h3>
				<p className="m-05e italic color-aaa">{this.props.item.spell_level}</p>
				<ul>
					<li>{'casting time: '+this.props.item.casting_time}</li>
					<li>{'range: '+this.props.item.range}</li>
					{this.props.item.area.length ? <li>{'area: '+this.props.item.area}</li> : null}
					<li>{'duration: '+this.props.item.duration}</li>
					<li>{'saving throw: '+this.props.item.saving_throw}</li>
				</ul>
				<p className="m-b-0">{this.props.item.description}</p>
			</li>
		);
	}
});

module.exports = FilterableSpell;
