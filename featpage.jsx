/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactAsync = require('react-async');
var superagent = require('superagent');

var PageNav = require('./pagenav.jsx');
var FilterableFeatList = require('./components/filterablefeatlist.jsx');

var FeatPage = React.createClass({
	mixins: [ReactAsync.Mixin],
	statics: {
		getFeatList: function (cb) {
			superagent.get('localhost:3001/api/feats', function (err, res) {
				cb(err, res ? {feats: res.body} : null);
			});
		}
	},
	getInitialStateAsync: function (cb) {
		this.type.getFeatList(cb);
	},
	render: function () {
		return (
			<div className="FeatPage">
				<div className="bg-purple">
					<PageNav currentpage="Feats"/>
				</div>
				<FilterableFeatList feats={this.state.feats}/>
			</div>
		);
	}
});

module.exports = FeatPage;
