import React, {Component} from 'react';
var PageNav = require('./pagenav');
var FilterableFeatList = require('./filterablefeatlist');

class FeatPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			feats: []
		};
	}
	getFeatList() {
		fetch('/api/feats').then(response => response.json()).then(json => {
			this.setState({
				feats: json
			});
		}).catch(err => {
			console.log('parsing failed', err)
		});
	}
	componentWillMount() {
		this.getFeatList();
	}
	render() {
		return (
			<div className='FeatPage'>
				<FilterableFeatList feats={this.state.feats}/>
			</div>
		);
	}
}

module.exports = FeatPage;
