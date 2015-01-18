var React = require('react');

var ClassRadio = React.createClass({
	propTypes: {
		name: React.PropTypes.string.isRequired,
		value: React.PropTypes.string,
		defaultChecked: React.PropTypes.bool,
		_onChange: React.PropTypes.func
	},
	render: function() {
		return (
			<div>
				<input
					type="radio"
					name={this.props.name}
					defaultChecked={this.props.defaultChecked}
					onChange={this.handleRadioChange}
					value={this.props.value} />
				<label className="p-05e">{this.props.value}</label>
			</div>
		);
	}

});

module.exports = ClassRadio;
