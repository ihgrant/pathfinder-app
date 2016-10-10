import React, {Component} from 'react';

var FilterableFeat = require('./filterablefeat');
var ChosenFeat = require('./chosenfeat');

class FilterableFeatList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filter: '',
			filterType: 'all',
			moreForm: false,
			prereqs: []
		};
		this.addFeat = this.addFeat.bind(this);
		this.removeFeat = this.removeFeat.bind(this);
		this.handleFilterChange = this.handleFilterChange.bind(this);
		this.handleRadioChange = this.handleRadioChange.bind(this);
		this.handleShowMore = this.handleShowMore.bind(this);
	}
	handleFilterChange(e) {
		this.setState({
			filter: e.target.value.toLowerCase(),
		});
	}
	handleShowMore(e) {
		this.setState({
			moreForm: !this.state.moreForm
		});
		e.preventDefault();
	}
	handleRadioChange(e) {
		this.setState({
			filterType: e.target.value
		});
	}
	addFeat(e) {
		if (this.state.filterType === 'prereqs') {
			var prereqs = this.state.prereqs;
			prereqs.push(e.currentTarget.dataset.id);
			this.setState({
				prereqs: prereqs
			});
		}
	}
	removeFeat(e) {
		if (this.state.filterType === 'prereqs') {
			var prereqs = this.state.prereqs;
			prereqs.splice(prereqs.indexOf(e.currentTarget.dataset.id), 1);
			this.setState({
				prereqs: prereqs
			});
		}
	}
	componentWillUpdate() {
		localStorage.feats_state = JSON.stringify(this.state);
	}
	render() {
		var feats = null;
		var chosenfeats = null;

		if (this.props.feats.length) {
			feats = this.props.feats
			.filter(feat => { // match for prerequisites (if applicable)
				if (this.state.filterType === 'prereqs' && feat.prerequisite_feats.length) {
					var feat_prereqs = feat.prerequisite_feats.split(',');
					if (this.state.prereqs.indexOf(feat_prereqs) !== -1) {
						return true;
					} else {
						return false;
					}
				}
				return true;
			})
			.filter(feat => feat.name.toLowerCase().indexOf(this.state.filter) !== -1)
			.splice(0, 50)
			.map(feat => (
				<FilterableFeat
					key={feat.id}
					feat={feat}
					addFeat={this.addFeat} />
			));
		}

		if (this.state.prereqs.length && this.state.filterType === 'prereqs') {
			chosenfeats = this.props.feats
			.filter(feat => this.state.prereqs.indexOf(feat.id.toString()) !== -1)
			.map(feat => (
				<ChosenFeat
					key={feat.id}
					feat={feat}
					removeFeat={this.removeFeat} />
			));
		}

		return (
			<div>
			<div className='bg-teal'>
				<form className='container pos-rel'>
					<input type='search'
						className='w-90 boxstyle bg-i'
						placeholder='Filter feats...'
						onChange={this.handleFilterChange}/>
					<button
						className='w-10 boxstyle bg-i'
						onClick={this.handleShowMore}>
						{this.state.moreForm ? 'Less...' : 'More...'}
					</button>
					<div className={'w-100 boxstyle bg-teal abs-top ani-slide hidden'+(this.state.moreForm ? ' h-18e' : ' h-0')}>
						<div className='p-05e'>
							<input type='radio' name='filter-type' defaultChecked value='all'
								onChange={this.handleRadioChange}/>
							<label className='p-05e'>Filter all feats</label><br/>
							<input type='radio' name='filter-type' value='prereqs'
								onChange={this.handleRadioChange}/>
							<label className='p-05e'>Filter by prerequisites</label><br/>
						</div>
					</div>
				</form>
			</div>
			<div className='bg-bluewhite'>
				<ul className='container ul-none'>
					{chosenfeats}
				</ul>
			</div>
			<div className='bg-white'>
				<ul className='container ul-none'>
					{feats}
				</ul>
			</div>
			</div>
		);
	}
}

module.exports = FilterableFeatList;
