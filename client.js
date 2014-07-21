/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactAsync = require('react-async');
var ReactRouter = require('react-router-component');
var superagent = require('superagent');

var Pages = ReactRouter.Pages;
var Page = ReactRouter.Page;
var NotFound = ReactRouter.NotFound;
var Link = ReactRouter.Link;

var MainPage = React.createClass({
	render: function () {
		return (
			<div className="MainPage container">
				<a href="/spells">Spells</a>
			</div>
		);
	}
});

var SpellPage = React.createClass({
	mixins: [ReactAsync.Mixin],
	statics: {
		getSpellList: function (cb, filters) {
			var filter = filters.filter;
			if (filter.length && filter !== '*' && filter !== '%') {
				var query = filters.filterCol+'=' + filter;

				if (filters.clas !== 'none') {
					query += '&start_lvl='+filters.min_lvl
						+'&end_lvl='+filters.max_lvl
						+'&clas='+filters.clas;
				}
				superagent.get('/api/spells?'+query, function(err, res) {
					cb(err, res ? res.body : null);
				});
			} else {
				cb(err, []);
			}
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
		// getUserInfo: function(username, cb) {
		// 	superagent.get(
		// 		'http://localhost:3000/api/users/' + username,
		// 		function(err, res) {
		// 			cb(err, res ? res.body : null);
		// 		});
		// }
	},
	getInitialStateAsync: function (cb) {
		this.type.getClassList(cb);
		// this.type.getMagicSchoolList(cb);
	},
	render: function () {
		return (
			<div className="SpellPage container">
				<FilterableList filterCol='name' classes={this.state}/>
			</div>
		);
	}
});

var FilterableList = React.createClass({
	getSpellList: function () {
		var filter = this.state.filter;
		if (filter.length && filter !== '*' && filter !== '%') {
			var query = this.props.filterCol+'=' + filter;

			if (this.state.clas !== 'none') {
				query += '&start_lvl='+this.state.min_lvl
					+'&end_lvl='+this.state.max_lvl
					+'&clas='+this.state.clas;
			}
			superagent.get('/api/spells?'+query, function(err, res) {
				if (err) {
					console.log(err);
				} else {
					this.setState({
						spells: res ? res.body : [],
					});
				}
			}.bind(this));
		} else {
			this.setState({
				spells: []
			});
		}
	},
	handleFilterChange: function (e) {
		this.setState({
			filter: e.target.value,
			moreForm: false
		}, this.getSpellList);
	},
	handleShowMore: function () {
		this.setState({
			moreForm: !this.state.moreForm
		});
		return false;
	},
	handleRangeValues: function (e) {
		var lvl = e.target.value,
		id = e.target.id;
		if (id === 'lvl_min') {
			this.setState({
				min_lvl: lvl
			}, this.getSpellList);
		} else {
			this.setState({
				max_lvl: lvl
			}, this.getSpellList);
		}
	},
	handleRadioChange: function (e) {
		this.setState({
			clas: e.target.value
		}, this.getSpellList);
	},
	getInitialState: function () {
		return {
			filter: '',
			spells: [],
			moreForm: false,
			min_lvl: 0,
			max_lvl: 9,
			clas: 'none'
		};
	},
	render: function () {
		var spells = this.state.spells.map(function (spell) {
			return (
				<FilterableListItem
					key={spell.pk}
					item={spell}
				/>
			);
		});
		// classes = this.props.classes.map(function (clas) {
		// 	return clas.description;
		// }.bind(this));
		console.log(this.props.classes);
		return (
			<div>
				<form className="pos-rel">
					<input
						type="search"
						className="w-90 boxstyle"
						autofocus
						placeholder={"Filter "+this.props.filterCol+"..."}
						onChange={this.handleFilterChange}
					/>
					<span className="abs-inputright">
						{this.state.clas !=='none' ? this.state.clas+","+" level "+this.state.min_lvl+"-"+this.state.max_lvl : ""}
					</span>
					<button
						className="w-10 boxstyle"
						onClick={this.handleShowMore}>
						{this.state.moreForm ? "Less..." : "More..."}
					</button>
					<div className={"w-100 boxstyle  abs-top bg-fff"+(this.state.moreForm ? "" : " invis")}>
						<div className="p-05e">
							<table className="w-100">
								<tr>
									<td className="p-05e"><label htmlFor="class">Class:</label></td>
									<td></td>
									<td className="p-05e"><input type="radio" name="class" onChange={this.handleRadioChange} value="none"/><label className="p-05e">(none)</label></td>
								</tr>
								<tr>
									<td className="p-05e"><input type="radio" name="class" onChange={this.handleRadioChange} value="sorceror"/><label className="p-05e">Sorceror</label></td>
									<td className="p-05e"><input type="radio" name="class" onChange={this.handleRadioChange} value="bard"/><label className="p-05e">Bard</label></td>
									<td className="p-05e"><input type="radio" name="class" onChange={this.handleRadioChange} value="inquisitor"/><label className="p-05e">Inquisitor</label></td>
								</tr>
								<tr>
									<td className="p-05e"><input type="radio" name="class" onChange={this.handleRadioChange} value="wizard"/><label className="p-05e">Wizard</label></td>
									<td className="p-05e"><input type="radio" name="class" onChange={this.handleRadioChange} value="paladin"/><label className="p-05e">Paladin</label></td>
									<td className="p-05e"><input type="radio" name="class" onChange={this.handleRadioChange} value="oracle"/><label className="p-05e">Oracle</label></td>
								</tr>
								<tr>
									<td className="p-05e"><input type="radio" name="class" onChange={this.handleRadioChange} value="cleric"/><label className="p-05e">Cleric</label></td>
									<td className="p-05e"><input type="radio" name="class" onChange={this.handleRadioChange} value="alchemist"/><label className="p-05e">Alchemist</label></td>
									<td className="p-05e"><input type="radio" name="class" onChange={this.handleRadioChange} value="antipaladin"/><label className="p-05e">Antipaladin</label></td>
								</tr>
								<tr>
									<td className="p-05e"><input type="radio" name="class" onChange={this.handleRadioChange} value="druid"/><label className="p-05e">Druid</label></td>
									<td className="p-05e"><input type="radio" name="class" onChange={this.handleRadioChange} value="summoner"/><label className="p-05e">Summoner</label></td>
									<td className="p-05e"><input type="radio" name="class" onChange={this.handleRadioChange} value="magus"/><label className="p-05e">Magus</label></td>
								</tr>
								<tr>
									<td className="p-05e"><input type="radio" name="class" onChange={this.handleRadioChange} value="ranger"/><label className="p-05e">Ranger</label></td>
									<td className="p-05e"><input type="radio" name="class" onChange={this.handleRadioChange} value="witch"/><label className="p-05e">Witch</label></td>
									<td className="p-05e"><input type="radio" name="class" onChange={this.handleRadioChange} value="adept"/><label className="p-05e">Adept</label></td>
								</tr>
							</table>
						</div>
						<div className="p-05e">
							<label htmlhtmlFor="lvl_min">{"Minimum Spell Level ("+this.state.min_lvl+")"}</label>
							<input id="lvl_min" name="lvl_min" type="range" min="0" max="9"
								defaultValue={this.state.min_lvl}
								onChange={this.handleRangeValues}
							/>
						</div>
						<div className="p-05e">
							<label htmlhtmlFor="lvl_max">{"Maximum Spell Level ("+this.state.max_lvl+")"}</label>
							<input id="lvl_max" name="lvl_max" type="range" min="0" max="9"
								defaultValue={this.state.max_lvl}
								onChange={this.handleRangeValues}
							/>
						</div>
					</div>
				</form>
				<ul className="ul-none">
					{spells}
				</ul>
			</div>
		);
	}
});

var FilterableListItem = React.createClass({
	render: function () {
		return (
			<li className="p-1e">
				<h3 className="m-t-0">{this.props.item.name}</h3>
				<p className="m-05e italic color-aaa">{this.props.item.spell_level}</p>
				<ul>
					<li>{'casting time: '+this.props.item.casting_time}</li>
					<li>{'range: '+this.props.item.range}</li>
					{this.props.item.area.length ? <li>{'area: '+this.props.item.area}</li> : null}
					<li>{'duration: '+this.props.item.duration}</li>
					<li>{'saving throw: '+this.props.item.saving_throw}</li>
				</ul>
				<p className="m-b-0">{this.props.item.description}</p>
			</li>
		);
	}
});

// var UserPage = React.createClass({
// 	mixins: [ReactAsync.Mixin],
// 	statics: {
// 		getUserInfo: function(username, cb) {
// 			superagent.get(
// 				'http://localhost:3000/api/users/' + username,
// 				function(err, res) {
// 					cb(err, res ? res.body : null);
// 				});
// 		}
// 	},
// 	getInitialStateAsync: function(cb) {
// 		this.type.getUserInfo(this.props.username, cb);
// 	},
// 	componentWillReceiveProps: function(nextProps) {
// 		if (this.props.username !== nextProps.username) {
// 			this.type.getUserInfo(nextProps.username, function(err, info) {
// 				if (err) {
// 					throw err;
// 				}
// 				this.setState(info);
// 			}.bind(this));
// 		}
// 	},
// 	render: function() {
// 		var otherUser = this.props.username === 'doe' ? 'ivan' : 'doe';
// 		return (
// 			<div className="UserPage">
// 				<h1>Hello, {this.state.name}!</h1>
// 				<p>
// 					Go to <Link href={"/users/" + otherUser}>/users/{otherUser}</Link>
// 				</p>
// 				<p><Link href="/">Logout</Link></p>
// 			</div>
// 		);
// 	}
// });

var NotFoundHandler = React.createClass({

	render: function() {
		return (
			<p>Page not found</p>
		);
	}
});

var App = React.createClass({

	render: function() {
		return (
			<html>
				<head>
					<link rel="stylesheet" href="/assets/normalize.css" />
					<link href='http://fonts.googleapis.com/css?family=Old+Standard+TT:400,400italic,700' rel='stylesheet' type='text/css' />
					<link href='http://fonts.googleapis.com/css?family=Vollkorn:700' rel='stylesheet' type='text/css' />
					<link rel="stylesheet" href="/assets/style.css" />
					<script src="/assets/bundle.js" />
				</head>
				<Pages className="App container" path={this.props.path}>
					<Page path="/" handler={MainPage} />
					<Page path="/spells" handler={SpellPage} />
					<NotFound handler={NotFoundHandler} />
				</Pages>
			</html>
		);
	}
});

module.exports = App;

if (typeof window !== 'undefined') {
	window.onload = function() {
		React.renderComponent(App(), document);
	}
}
