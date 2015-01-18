/**
 * @jsx React.DOM
 */

var React = require('react');
// var ReactAsync = require('react-async');
var superagent = require('superagent');

var PageNav = require('./pagenav');
var FilterableFeatList = require('./filterablefeatlist');

var FeatPage = React.createClass({
	getFeatList: function (cb) {
		superagent.get('/api/feats', function (err, res) {
			if (err) {
				console.log(err);
			} else {
				this.setState({
					feats: res.body
				});
			}
		}.bind(this));
	},
	componentWillMount: function() {
		this.getFeatList();
	},
	getInitialState: function() {
		return {
			feats: []
		};
	},
	render: function () {
		return (
			<div className="FeatPage">
				<FilterableFeatList feats={this.state.feats}/>
			</div>
		);
	}
});

module.exports = FeatPage;
