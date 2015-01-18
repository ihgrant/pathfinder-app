var React = require('react');
// var ReactAsync = require('react-async');
var superagent = require('superagent');

var PageNav = require('./pagenav');
var FilterableSpellList = require('./filterablespelllist');

var SpellPage = React.createClass({
	getSpellList: function (cb, filters) {
		superagent.get('/api/spells', function(err, res) {
			if (err) {
				console.log(err);
			} else {
				this.setState({
					spells: res.body
				});
			}
		}.bind(this));
	},
	// getClassList: function (cb) {
	// 	superagent.get('/api/classes', function (err, res) {
	// 		cb(err, res ? res.body : null);
	// 	});
	// },
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
					spells={this.state.spells} />
			</div>
		);
	}
});

module.exports = SpellPage;
