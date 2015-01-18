var React = require('react');

var Footer = React.createClass({

	render: function() {
		return (
			<div className='container'>
				<p className='a-c'>
					{'by ian grant / '}
					<a href='https://github.com/ihgrant/pathfinder-app'>{'github'}</a>
				</p>
			</div>
		);
	}

});

module.exports = Footer;
