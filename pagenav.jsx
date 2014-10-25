/**
 * @jsx React.DOM
 */

var React = require('react');

var PageNav = React.createClass({
	propTypes: {
		currentPage: React.PropTypes.string
	},
	render: function () {
		return (
			<div className="container">
				<div className="tbl w-100">
				<div className="tbl-row">
					<div className={"tbl-cell p-05e"+(this.props.currentpage==='Home'?' current':'')}>
						<a href="/">Home</a>
					</div>
					<div className={"tbl-cell p-05e"+(this.props.currentpage==='Spells'?' current':'')}>
						<a href="/spells">Spells</a>
					</div>
					<div className={"tbl-cell p-05e"+(this.props.currentpage==='Feats'?' current':'')}>
						<a href="/feats">Feats</a>
					</div>
				</div>
				</div>
			</div>
		);
	}

});

module.exports = PageNav;
