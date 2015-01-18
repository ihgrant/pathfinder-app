var React = require('react');
var Link = require('react-router').Link;

var PageNav = React.createClass({
	render: function () {
		return (
			<div className="bg-purple">
				<div className='container'>
					<div className='tbl w-100'>
					<div className='tbl-row'>
						<div className={'tbl-cell p-05e'}>
							<Link to='home'>{'Home'}</Link>
						</div>
						<div className={'tbl-cell p-05e'}>
							<Link to='spells'>{'Spells'}</Link>
						</div>
						<div className={'tbl-cell p-05e'}>
							<Link to='feats'>{'Feats'}</Link>
						</div>
					</div>
					</div>
				</div>
			</div>
		);
	}

});

module.exports = PageNav;
