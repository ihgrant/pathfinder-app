import React from 'react'
import { render } from 'react-dom'
import { HashRouter, Match, Miss } from 'react-router'

var HomePage = require('./homepage');
var SpellPage = require('./spellpage');
var FeatPage = require('./featpage');
var PageNav = require('./pagenav');
var Footer = require('./footer');

const App = () => (
	<HashRouter>
    	<div>
			<PageNav />
			<Match component={HomePage} exactly pattern='/' />
			<Match component={SpellPage} pattern='/spells' />
			<Match component={FeatPage} pattern='/feats' />
			<Footer />
		</div>
	</HashRouter>
);

render(<App />, document.getElementById('page'));
