var React = require('react');

var FilterableSpell = React.createClass({
	render: function () {
		return (
			<li className="p-1e">
				<h3 className="m-t-0">{this.props.spell.name}</h3>
				<p className="m-05e italic color-aaa">{this.props.spell.school+'; '+this.props.spell.spell_level}</p>
				<ul>
					<li>{'casting time: '+this.props.spell.casting_time}</li>
					<li>{'range: '+this.props.spell.range}</li>
					{this.props.spell.area.length ? <li>{'area: '+this.props.spell.area}</li> : null}
					<li>{'duration: '+this.props.spell.duration}</li>
					<li>{'saving throw: '+this.props.spell.saving_throw}</li>
				</ul>
				<p className="m-b-0">{this.props.spell.description}</p>
			</li>
		);
	}
});

module.exports = FilterableSpell;
