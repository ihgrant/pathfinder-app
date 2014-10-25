/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
// var ReactAsync = require('react-async');
var ReactRouter = require('react-router-component');
// var superagent = require('superagent');

var Pages = ReactRouter.Pages;
var Page = ReactRouter.Page;
var NotFound = ReactRouter.NotFound;
var Link = ReactRouter.Link;

var MainPage = React.createClass({
	render: function () {
		return (
			<div className="MainPage">
				<div className="bg-purple">
					<PageNav currentpage="Home"/>
				</div>
			</div>
		);
	}
});

var PageNav = require('./pagenav.jsx');
var SpellPage = require('./spellpage.jsx');
var FeatPage = require('./featpage.jsx');

var NotFoundHandler = React.createClass({
	render: function() {
		return (
			<div className="a-c">
				<p>Page not found</p>
			</div>
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
					<link rel="stylesheet" href="/assets/utility.css" />
					<link rel="stylesheet" href="/assets/style.css" />
					<script src="/assets/bundle.js" />
				</head>
				<Pages className="App bg-bluewhite" path={this.props.path}>
					<Page path="/" handler={MainPage} />
					<Page path="/spells" handler={SpellPage} />
					<Page path="/feats" handler={FeatPage} />
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
