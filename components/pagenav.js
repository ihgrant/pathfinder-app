var React = require('react/addons');
var Link = require('react-router').Link;

var PageNav = React.createClass({
	render: function () {
		var cx = React.addons.classSet;
		var classes = cx({
			'tbl-cell': true,
			'p-05e': true
		});
		return (
			<div className="bg-purple">
				<div className='container'>
					<div className='tbl w-100'>
						<div className='tbl-row'>
							<Link activeClassName='current' className={classes} to='home'>
								<div>{'Home'}</div>
							</Link>
							<Link activeClassName='current' className={classes} to='spells'>
								<div>{'Spells'}</div>
							</Link>
							<Link activeClassName='current' className={classes} to='feats'>
								<div>{'Feats'}</div>
							</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}

});

module.exports = PageNav;
