import React, {Component} from 'react';
var PageNav = require('./pagenav');
var FilterableSpellList = require('./filterablespelllist');

class SpellPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			spells: []
		};
	}
	getSpellList() {
		fetch('/api/spells').then(response => response.json()).then(json => {
			this.setState({
				spells: json
			});
		}).catch(err => {
			console.log('parsing failed', err)
		});
	}
	componentDidMount() {
		this.getSpellList();
	}
	render() {
		return (
			<div className='SpellPage'>
				<FilterableSpellList
					filterCol='name'
					spells={this.state.spells} />
			</div>
		);
	}
}

module.exports = SpellPage;
