var React = require('react');
var _ = require('lodash');

var SelectMenu = React.createClass({
	propTypes: {
		name: React.PropTypes.string,
		options: React.PropTypes.array,
		_onChange: React.PropTypes.func
	},
	render: function() {
		var options = _.map(this.props.options, function (opt) {
			return <option value={opt.value}>{opt.description}</option>;
		});

		return (
			<select
				name={this.props.name}
				onChange={this.props._onChange}>
				{options}
			</select>
		);
	}

});

module.exports = SelectMenu;
