/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactAsync = require('react-async');
var superagent = require('superagent');

var PageNav = require('./pagenav.jsx');
var FilterableSpellList = require('./components/filterablespelllist.jsx');

var SpellPage = React.createClass({
	mixins: [ReactAsync.Mixin],
	statics: {
		getSpellList: function (cb, filters) {
			superagent.get('/api/spells', function(err, res) {
				cb(err, res ? res.body : null);
			});
		},
		getClassList: function (cb) {
			superagent.get('/api/classes', function (err, res) {
				cb(err, res ? res.body : null);
			});
		},
		getMagicSchoolList: function (cb) {
			superagent.get('/api/magic_schools', function (err, res) {
				cb(err, res ? res.body : null);
			});
		}
	},
	getInitialStateAsync: function (cb) {
		superagent.get('localhost:3001/api/spells', function(err, res) {
			cb(err, res ? {spells: res.body} : null);
		}.bind(this));
		// this.type.getMagicSchoolList(cb);
	},
	render: function () {
		return (
			<div className="SpellPage">
				<div className="bg-purple">
					<PageNav currentpage="Spells"/>
				</div>
				<FilterableSpellList filterCol='name' spells={this.state.spells}/>
			</div>
		);
	}
});

module.exports = SpellPage;
