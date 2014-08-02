/**
 * @jsx React.DOM
 */

var React = require('react');

var FilterableFeat = require('./filterablefeat.jsx');
var ChosenFeat = require('./chosenfeat.jsx');

var FilterableFeatList = React.createClass({
	handleFilterChange: function (e) {
		this.setState({
			filter: e.target.value.toLowerCase(),
		});
	},
	handleShowMore: function () {
		this.setState({
			moreForm: !this.state.moreForm
		});
		return false;
	},
	handleRadioChange: function (e) {
		this.setState({
			filterType: e.target.value
		});
	},
	addFeat: function (e) {
		var prereqs = this.state.prereqs;
		prereqs.push(e.currentTarget.dataset.name);
		this.setState({
			prereqs: prereqs
		});
	},
	removeFeat: function (e) {
		//
	},
	getInitialState: function () {
		// if (!localStorage.feats_state) {
			return {
				filter: '',
				filterType: 'all',
				moreForm: false,
				prereqs: []
			};
		// } else {
		// 	return JSON.parse(localStorage.feats_state);
		// }
	},
	componentWillUpdate: function () {
		localStorage.feats_state = JSON.stringify(this.state);
	},
	render: function () {
		var feats = null;

		if (this.props.feats.length) {
			feats = this.props.feats
			.filter(function (feat) { // match for prerequisites (if applicable)
				if (this.state.filterType === 'prereqs' && feat.prerequisite_feats.length) {
					if (this.state.prereqs.indexOf(feat.prerequisite_feats) !== -1) {
						return true;
					} else {
						return false;
					}
				}
				return true;
			}.bind(this))
			.filter(function (feat) { // match against text filter
				return (feat.name.toLowerCase().indexOf(this.state.filter) !== -1);
			}.bind(this))
			.splice(0, 50)
			.map(function (feat) {
				return (
					<FilterableFeat key={feat.id} feat={feat} addFeat={this.addFeat} />
				);
			}.bind(this));
		}

		return (
			<div>
			<div className="bg-teal">
				<form className="container pos-rel">
					<input type="search"
						className="w-90 boxstyle bg-i"
						placeholder="Filter feats..."
						onChange={this.handleFilterChange}/>
					<button
						className="w-10 boxstyle bg-i"
						onClick={this.handleShowMore}>
						{this.state.moreForm ? "Less..." : "More..."}
					</button>
					<div className={"w-100 boxstyle bg-teal abs-top ani-slide hidden"+(this.state.moreForm ? " h-18e" : " h-0")}>
						<div className="p-05e">
							<input type="radio" name="filter-type" defaultChecked onChange={this.handleRadioChange} value="all"/>
							<label className="p-05e">Filter all feats</label><br/>
							<input type="radio" name="filter-type" onChange={this.handleRadioChange} value="prereqs"/>
							<label className="p-05e">Filter by prerequisites</label><br/>
						</div>
					</div>
				</form>
			</div>
			<div className="bg-white">
				<ul className="container ul-none">
					{feats}
				</ul>
			</div>
			</div>
		);
	}
});

module.exports = FilterableFeatList;
