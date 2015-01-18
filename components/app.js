var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;
var Handler = Router.Handler;

var HomePage = require('./homepage');
var SpellPage = require('./spellpage');
var FeatPage = require('./featpage');
var PageNav = require('./pagenav');
var Footer = require('./footer');

var App = React.createClass({
	render: function() {
		return (
			<div>
				<PageNav />
				<RouteHandler />
				<Footer />
			</div>
		);
	}
});

var routes = (
	<Route name='app' handler={App} path='/'>
		<Route name='spells' handler={SpellPage} />
		<Route name='feats' handler={FeatPage} />
		<DefaultRoute name='home' handler={HomePage} />
	</Route>
);

// Router.run(routes, Router.HistoryLocation, function (Handler) {
Router.run(routes, function (Handler) {
	React.render(<Handler />, document.getElementById('page'));
});
