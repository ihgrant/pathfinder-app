import React, { Component, PropTypes } from "react";

var FilterableSpell = require("./filterablespell");
var SliderInput = require("./sliderinput");
var ClassRadio = require("./classradio");

class FilterableSpellList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: "",
            spells: [],
            moreForm: false,
            min_lvl: 0,
            max_lvl: 9,
            clas: "none"
        };
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleShowMore = this.handleShowMore.bind(this);
        this.handleMinValue = this.handleMinValue.bind(this);
        this.handleMaxValue = this.handleMaxValue.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
    }
    handleFilterChange(e) {
        this.setState({
            filter: e.target.value.toLowerCase(),
            moreForm: false
        });
    }
    handleShowMore(e) {
        this.setState({
            moreForm: !this.state.moreForm
        });
        e.preventDefault();
    }
    handleMinValue(e) {
        var lvl = e.target.value,
            id = e.target.id;
        this.setState({
            min_lvl: lvl
        });
    }
    handleMaxValue(e) {
        var lvl = e.target.value,
            id = e.target.id;
        this.setState({
            max_lvl: lvl
        });
    }
    handleRadioChange(e) {
        this.setState({
            clas: e.target.value
        });
    }
    componentWillUpdate() {
        localStorage.spell_state = JSON.stringify(this.state);
    }
    render() {
        var spells = [];
        var classes = [
            "none",
            "sorceror",
            "bard",
            "inquisitor",
            "wizard",
            "paladin",
            "oracle",
            "cleric",
            "alchemist",
            "antipaladin",
            "druid",
            "summoner",
            "magus",
            "ranger",
            "witch",
            "adept"
        ];
        var classRadios = classes.map(el =>
            <ClassRadio
                key={el}
                name={el}
                onChange={this.handleFilterChange}
                value={this.state.clas}
            />
        );

        if (this.props.spells.length) {
            spells = this.props.spells
                .filter(spell => {
                    if (spell.name.toLowerCase().indexOf(this.state.filter) === -1) {
                        return false;
                    }

                    if (
                        this.state.clas !== "none" &&
                        (spell[this.state.clas] === "NULL" ||
                            Number(spell[this.state.clas]) < this.state.min_lvl ||
                            Number(spell[this.state.clas]) > this.state.max_lvl)
                    ) {
                        return false;
                    }

                    return true;
                })
                .splice(0, 50) // return no more than 50 entries to keep render times down
                .map(spell => <FilterableSpell key={spell.pk} spell={spell} />);
        }
        // <ClassRadio name='class' defaultChecked={true} _onChange={this.handleRadioChange} value='none' />

        return (
            <div>
                <div className="bg-teal">
                    <form className="pos-rel container">
                        <input
                            type="search"
                            className="w-90 boxstyle bg-i"
                            autoFocus
                            placeholder={`Filter by ${this.props.filterCol}...`}
                            onChange={this.handleFilterChange}
                        />
                        <span className="abs-inputright">
                            {this.state.clas !== "none"
                                ? `${this.state.clas}, level ${this.state.min_lvl}-${this.state
                                      .max_lvl}`
                                : ""}
                        </span>
                        <button className="w-10 boxstyle bg-i" onClick={this.handleShowMore}>
                            {this.state.moreForm ? "Less..." : "More..."}
                        </button>
                        <div
                            className={
                                "w-100 boxstyle bg-teal abs-top ani-slide hidden" +
                                (this.state.moreForm ? " h-18e" : " h-0")
                            }
                        >
                            <div className="p-05e">
                                <label htmlFor="class">Class:</label>
                                <br />
                                <div className="col-3">
                                    {classRadios}
                                </div>
                            </div>
                            <div className="p-05e">
                                <SliderInput
                                    name="min_lvl"
                                    label={"Minimum Spell Level (" + this.state.min_lvl + ")"}
                                    min={0}
                                    max={9}
                                    defaultValue={0}
                                    handleChange={this.handleMinValue}
                                />
                            </div>
                            <div className="p-05e">
                                <SliderInput
                                    name="max_lvl"
                                    label={"Maximum Spell Level (" + this.state.max_lvl + ")"}
                                    min={0}
                                    max={9}
                                    defaultValue={9}
                                    handleChange={this.handleMaxValue}
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
}

FilterableSpellList.propTypes = {
    filterCol: PropTypes.string,
    spells: PropTypes.array
};

module.exports = FilterableSpellList;
