var React = require('react');
var _ = require('lodash');

var FilterableSpell = require('./filterablespell');
var SliderInput = require('./sliderinput');
var ClassRadio = require('./classradio');
var TextInput = require('./textinput');
var SelectMenu = require('./selectmenu');

var FilterableSpellList = React.createClass({
	propTypes: {
		filterCol: React.PropTypes.string,
		spells: React.PropTypes.array,
		classes: React.PropTypes.array,
		schools: React.PropTypes.array
	},
	handleFilterChange: function (e) {
		this.setState({
			filter: e.target.value.toLowerCase(),
			moreForm: false
		});
	},
	handleShowMore: function (e) {
		this.setState({
			moreForm: !this.state.moreForm
		});
		e.preventDefault();
	},
	handleMinValue: function (e) {
		var lvl = e.target.value,
		id = e.target.id;
		this.setState({
			min_lvl: lvl
		});
	},
	handleMaxValue: function (e) {
		var lvl = e.target.value,
		id = e.target.id;
		this.setState({
			max_lvl: lvl
		});
	},
	handleRadioChange: function (e) {
		this.setState({
			clas: e.target.value
		});
	},
	componentWillUpdate: function () {
		localStorage.spell_state = JSON.stringify(this.state);
	},
	getInitialState: function () {
		return {
			filter: '',
			moreForm: false,
			min_lvl: 0,
			max_lvl: 9,
			clas: 'none'
		};
	},
	getDefaultProps: function() {
		return {
			spells: [],
			schools: [],
			classes: []
		};
	},
	render: function () {
		var spells = _.chain(this.props.spells)
		.filter(function (spell) {
			return spell.name.toLowerCase().indexOf(this.state.filter) !== -1;
		}, this)
		.filter(function (spell) {
			if (this.state.clas !== 'none' 
				&& (spell[this.state.clas] === 'NULL'
					|| Number(spell[this.state.clas]) < this.state.min_lvl
					|| Number(spell[this.state.clas]) > this.state.max_lvl)) return false;
			return true;
		}, this)
		.first(50)
		.map(function (spell) {
			return (
				<FilterableSpell
					key={spell.pk}
					spell={spell} />
			);
		});

		var classes = _.map(this.props.classes, function (clas) {
			return {
				description: clas.description,
				value: clas.description
			};
		});

		// <ClassRadio name='class' defaultChecked={true} _onChange={this.handleRadioChange} value='none' />

		return (
			<div>
			<div className='bg-teal'>
				<form className='pos-rel container'>
				<div className='row'>
					<div className='ten columns'>
						<TextInput
							type='search'
							classes={['u-full-width']}
							autofocus={true}
							placeholder={'Filter '+this.props.filterCol+'...'}
							_onChange={this.handleFilterChange} />
						<span className='abs-inputright'>
							{this.state.clas !=='none'
								? this.state.clas+','+' level '+this.state.min_lvl+'-'+this.state.max_lvl
								: ''}
						</span>
					</div>
					<div className='two columns'>
						<button
							className='u-full-width'
							onClick={this.handleShowMore}>
							{this.state.moreForm ? 'Less...' : 'More...'}
						</button>
					</div>
					<div className={'u-full-width bg-teal abs-top ani-slide hidden'+(this.state.moreForm ? ' h-18e' : ' h-0')}>
						<div className='p-05e'>
							<label htmlFor='class'>Class:</label><br/>
							<SelectMenu name='class' options={classes} />
						</div>
						<div className='p-05e'>
							<SliderInput name='min_lvl'
								label={'Minimum Spell Level ('+this.state.min_lvl+')'}
								min={0}
								max={9}
								defaultValue={0}
								handleChange={this.handleMinValue} />
						</div>
						<div className='p-05e'>
							<SliderInput name='max_lvl'
								label={'Maximum Spell Level ('+this.state.max_lvl+')'}
								min={0}
								max={9}
								defaultValue={9}
								handleChange={this.handleMaxValue} />
						</div>
					</div>
				</div>
				</form>
			</div>
			<div className='bg-white'>
				<ul className='container ul-none'>
					{spells}
				</ul>
			</div>
			</div>
		);
	}
});

module.exports = FilterableSpellList;
