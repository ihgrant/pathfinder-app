var React = require('react');
var Link = require('react-router').Link;

var HomePage = React.createClass({

	render: function() {
		return (
			<div className='container'>
				<h1 className='a-c'>{'Home'}</h1>
				<ul>
					<li><Link to='spells'>{'Spells'}</Link></li>
					<li><Link to='feats'>{'Feats'}</Link></li>
				</ul>
			</div>
		);
	}

});

module.exports = HomePage;
