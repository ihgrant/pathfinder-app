var React = require('react');
// var ReactAsync = require('react-async');
var superagent = require('superagent');
var _ = require('lodash');

var PageNav = require('./pagenav');
var FilterableSpellList = require('./filterablespelllist');

var SpellPage = React.createClass({
	getSpellList: function (cb, filters) {
		superagent.get('/api/spells', function(err, res) {
			if (err) {
				console.log(err);
			} else {
				var spells = res.body;
				var schools = _.uniq(spells, 'school');
				this.setState({
					spells: spells,
					schools: schools
				})
			}
		}.bind(this));
	},
	getClassList: function (cb) {
		superagent.get('/api/classes', function (err, res) {
			if (err) {
				console.log(err);
			} else {
				var classes = res.body;
				this.setState({
					classes: classes
				});
			}
		}.bind(this));
	},
	// getMagicSchoolList: function (cb) {
	// 	superagent.get('/api/magic_schools', function (err, res) {
	// 		cb(err, res ? res.body : null);
	// 	});
	// },
	// getInitialStateAsync: function (cb) {
	// 	superagent.get('localhost:3001/api/spells', function(err, res) {
	// 		cb(err, res ? {spells: res.body} : null);
	// 	}.bind(this));
	// 	// this.type.getMagicSchoolList(cb);
	// },
	componentDidMount: function() {
		this.getSpellList();
		this.getClassList();
	},
	getInitialState: function() {
		return {
			spells: []
		};
	},
	render: function () {
		return (
			<div className='SpellPage'>
				<FilterableSpellList
					filterCol='name'
					classes={this.state.classes}
					schools={this.state.schools}
					spells={this.state.spells} />
			</div>
		);
	}
});

module.exports = SpellPage;
