var React = require('react');
var DeleteIcon = require('./deleteicon');

var ChosenFeat = React.createClass({
	render: function () {
		return (
			<li className="p-05e" onClick={this.props.removeFeat} data-id={this.props.feat.id}>
				<DeleteIcon classes="icon-1-5e fill-white fl-l"/>
				<p className="m-0">
					<span className="bold">{this.props.feat.name+': '}</span>
					{this.props.feat.description}
				</p>
			</li>
		);
	}
});

module.exports = ChosenFeat;
