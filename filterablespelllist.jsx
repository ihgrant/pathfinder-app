/**
 * @jsx React.DOM
 */

var React = require('react');

var FilterableSpell = require('./filterablespell.jsx');

var FilterableSpellList = React.createClass({
	handleFilterChange: function (e) {
		this.setState({
			filter: e.target.value.toLowerCase(),
			moreForm: false
		});
	},
	handleShowMore: function () {
		this.setState({
			moreForm: !this.state.moreForm
		});
		return false;
	},
	handleRangeValues: function (e) {
		var lvl = e.target.value,
		id = e.target.id;
		if (id === 'lvl_min') {
			this.setState({
				min_lvl: lvl
			});
		} else {
			this.setState({
				max_lvl: lvl
			});
		}
	},
	handleRadioChange: function (e) {
		this.setState({
			clas: e.target.value
		});
	},
	getInitialState: function () {
		// if (!localStorage.spell_state) {
			return {
				filter: '',
				spells: [],
				moreForm: false,
				min_lvl: 0,
				max_lvl: 9,
				clas: 'none'
			};
		// } else {
		// 	return JSON.parse(localStorage.spell_state);
		// }
	},
	componentWillUpdate: function () {
		localStorage.spell_state = JSON.stringify(this.state);
	},
	render: function () {
		var spells = [];

		if (this.props.spells.length) {
			spells = this.props.spells
			.filter(function (spell) {
				if (spell.name.toLowerCase().indexOf(this.state.filter) === -1) return false;
				if (this.state.clas !== 'none' 
					&& (spell[this.state.clas] === 'NULL'
						|| Number(spell[this.state.clas]) < this.state.min_lvl
						|| Number(spell[this.state.clas]) > this.state.max_lvl)) return false;
				return true;
			}.bind(this))
			.splice(0, 50) // return no more than 50 entries to keep render times down
			.map(function (spell) {
				return (
					<FilterableSpell
						key={spell.pk}
						spell={spell}
					/>
				);
			});
		}
		return (
			<div>
			<div className="bg-teal">
				<form className="pos-rel container">
					<input
						type="search"
						className="w-90 boxstyle bg-i"
						autofocus
						placeholder={"Filter "+this.props.filterCol+"..."}
						onChange={this.handleFilterChange}
					/>
					<span className="abs-inputright">
						{this.state.clas !=='none' ? this.state.clas+","+" level "+this.state.min_lvl+"-"+this.state.max_lvl : ""}
					</span>
					<button
						className="w-10 boxstyle bg-i"
						onClick={this.handleShowMore}>
						{this.state.moreForm ? "Less..." : "More..."}
					</button>
					<div className={"w-100 boxstyle bg-teal abs-top ani-slide hidden"+(this.state.moreForm ? " h-18e" : " h-0")}>
						<div className="p-05e">
							<label htmlFor="class">Class:</label><br/>
							<div className="col-3">
								<input type="radio" name="class" defaultChecked onChange={this.handleRadioChange} value="none"/>
								<label className="p-05e">(none)</label><br/>
								<input type="radio" name="class" onChange={this.handleRadioChange} value="sorceror"/>
								<label className="p-05e">Sorceror</label><br/>
								<input type="radio" name="class" onChange={this.handleRadioChange} value="bard"/>
								<label className="p-05e">Bard</label><br/>
								<input type="radio" name="class" onChange={this.handleRadioChange} value="inquisitor"/>
								<label className="p-05e">Inquisitor</label><br/>
								<input type="radio" name="class" onChange={this.handleRadioChange} value="wizard"/>
								<label className="p-05e">Wizard</label><br/>
								<input type="radio" name="class" onChange={this.handleRadioChange} value="paladin"/>
								<label className="p-05e">Paladin</label><br/>
								<input type="radio" name="class" onChange={this.handleRadioChange} value="oracle"/>
								<label className="p-05e">Oracle</label><br/>
								<input type="radio" name="class" onChange={this.handleRadioChange} value="cleric"/>
								<label className="p-05e">Cleric</label><br/>
								<input type="radio" name="class" onChange={this.handleRadioChange} value="alchemist"/>
								<label className="p-05e">Alchemist</label><br/>
								<input type="radio" name="class" onChange={this.handleRadioChange} value="antipaladin"/>
								<label className="p-05e">Antipaladin</label><br/>
								<input type="radio" name="class" onChange={this.handleRadioChange} value="druid"/>
								<label className="p-05e">Druid</label><br/>
								<input type="radio" name="class" onChange={this.handleRadioChange} value="summoner"/>
								<label className="p-05e">Summoner</label><br/>
								<input type="radio" name="class" onChange={this.handleRadioChange} value="magus"/>
								<label className="p-05e">Magus</label><br/>
								<input type="radio" name="class" onChange={this.handleRadioChange} value="ranger"/>
								<label className="p-05e">Ranger</label><br/>
								<input type="radio" name="class" onChange={this.handleRadioChange} value="witch"/>
								<label className="p-05e">Witch</label><br/>
								<input type="radio" name="class" onChange={this.handleRadioChange} value="adept"/>
								<label className="p-05e">Adept</label>
							</div>
						</div>
						<div className="p-05e">
							<label htmlhtmlFor="lvl_min">{"Minimum Spell Level ("+this.state.min_lvl+")"}</label>
							<input id="lvl_min" name="lvl_min" type="range" min="0" max="9"
								defaultValue={this.state.min_lvl}
								onChange={this.handleRangeValues}
							/>
						</div>
						<div className="p-05e">
							<label htmlhtmlFor="lvl_max">{"Maximum Spell Level ("+this.state.max_lvl+")"}</label>
							<input id="lvl_max" name="lvl_max" type="range" min="0" max="9"
								defaultValue={this.state.max_lvl}
								onChange={this.handleRangeValues}
							/>
						</div>
					</div>
				</form>
			</div>
			<div className="bg-white">
				<ul className="container ul-none">
					{spells}
				</ul>
			</div>
			</div>
		);
	}
});

module.exports = FilterableSpellList;
