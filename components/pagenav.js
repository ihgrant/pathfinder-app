import React from 'react';
import {Link} from 'react-router';
import classnames from 'classnames';

function PageNav(props) {
	var classes = classnames({
		'tbl-cell': true,
		'p-05e': true
	});
	return (
		<div className='bg-purple'>
			<div className='container'>
				<div className='tbl w-100'>
					<div className='tbl-row'>
						<Link activeClassName='current' className={classes} to='home'>
							{'Home'}
						</Link>
						<Link activeClassName='current' className={classes} to='spells'>
							{'Spells'}
						</Link>
						<Link activeClassName='current' className={classes} to='feats'>
							{'Feats'}
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

module.exports = PageNav;
