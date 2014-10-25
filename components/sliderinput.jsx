/**
 * @jsx React.DOM
 */

var React = require('react');

var SliderInput = React.createClass({
	propTypes: {
		defaultValue: React.PropTypes.number,
		name: React.PropTypes.string.isRequired,
		label: React.PropTypes.string,
		min: React.PropTypes.number.isRequired,
		max: React.PropTypes.number.isRequired,
		handleChange: React.PropTypes.func
	},
	render: function() {
		return (
			<div>
				<label htmlFor={this.props.name}>{this.props.label || this.props.name}</label>
				<input id={this.props.name}
					name={this.props.name}
					type="range"
					min={this.props.min}
					max={this.props.max}
					defaultValue={this.props.min}
					onChange={this.props.handleChange} />
			</div>
		);
	}

});

module.exports = SliderInput;