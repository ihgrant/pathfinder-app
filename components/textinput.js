var React = require('react');

var RInput = React.createClass({
	propTypes: {
		type: React.PropTypes.string,
		classes: React.PropTypes.array,
		autofocus: React.PropTypes.bool,
		placeholder: React.PropTypes.string,
		_onChange: React.PropTypes.func
	},
	getDefaultProps: function() {
		return {
			type: 'text',
			classes: [''],
			autofocus: false,
			placeholder: ''
		};
	},
	render: function() {
		return (
			<input
				type={this.props.type}
				className={this.props.classes.join(' ')}
				autofocus={this.props.autofocus}
				placeholder={this.props.placeholder.length ? this.props.placeholder : null}
				onChange={this._onChange} />
		);
	}

});

module.exports = RInput;
