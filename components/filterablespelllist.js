// @flow
import React, { Component } from "react";

import FilterableSpell from "./filterablespell";
import SliderInput from "./sliderinput";
import ClassRadio from "./classradio";
import ExpandableForm from "./ExpandableForm";

export default class FilterableSpellList extends Component {
    props: {
        filterCol: string,
        spells: Spell[]
    };
    state: {
        clas: string,
        filter: string,
        max_lvl: number,
        min_lvl: number,
        moreForm: boolean
    };
    constructor() {
        super();
        this.state = {
            clas: "none",
            filter: "",
            max_lvl: 9,
            min_lvl: 0,
            moreForm: false
        };
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleShowMore = this.handleShowMore.bind(this);
        this.handleMinValue = this.handleMinValue.bind(this);
        this.handleMaxValue = this.handleMaxValue.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
    }
    handleFilterChange(e: Event & { currentTarget: HTMLInputElement }) {
        this.setState({
            filter: e.currentTarget.value.toLowerCase(),
            moreForm: false
        });
    }
    handleShowMore(e: Event) {
        this.setState(currentState => ({ moreForm: !currentState.moreForm }));
    }
    handleMinValue(e: Event & { currentTarget: HTMLInputElement }) {
        this.setState({ min_lvl: Number(e.currentTarget.value) });
    }
    handleMaxValue(e: Event & { currentTarget: HTMLInputElement }) {
        this.setState({ max_lvl: Number(e.currentTarget.value) });
    }
    handleRadioChange(e: Event & { currentTarget: HTMLInputElement }) {
        this.setState({ clas: e.currentTarget.value, moreForm: false });
    }
    componentWillUpdate() {
        // localStorage.spell_state = JSON.stringify(this.state);
    }
    render() {
        var classes = [
            "none",
            "adept",
            "alchemist",
            "antipaladin",
            "bard",
            "cleric",
            "druid",
            "inquisitor",
            "magus",
            "oracle",
            "paladin",
            "ranger",
            "sorceror",
            "summoner",
            "witch",
            "wizard"
        ];
        var classRadios = classes.map(el =>
            <ClassRadio
                checked={el === this.state.clas}
                key={el}
                label={el}
                name="class"
                onChange={this.handleRadioChange}
                value={el}
            />
        );
        var spells = this.props.spells
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

        return (
            <div>
                <ExpandableForm
                    inputPlaceholder={`Filter by ${this.props.filterCol}...`}
                    handleFilterChange={this.handleFilterChange}
                    handleShowMore={this.handleShowMore}
                    showMore={this.state.moreForm}
                >
                    <div className="container">
                        <div className="p-05e">
                            <label htmlFor="class">Class:</label>
                            <br />
                            <div className="flex" style={{ flexWrap: "wrap" }}>
                                {classRadios}
                            </div>
                        </div>
                        <div className="p-05e">
                            <SliderInput
                                defaultValue={0}
                                handleChange={this.handleMinValue}
                                label={`Minimum Spell Level (${this.state.min_lvl})`}
                                max={9}
                                min={0}
                                name="min_lvl"
                            />
                        </div>
                        <div className="p-05e">
                            <SliderInput
                                defaultValue={9}
                                handleChange={this.handleMaxValue}
                                label={`Maximum Spell Level (${this.state.max_lvl})`}
                                max={9}
                                min={0}
                                name="max_lvl"
                            />
                        </div>
                    </div>
                </ExpandableForm>
                <div className="bg-white" style={{ paddingTop: "1em" }}>
                    <span>
                        {this.state.clas !== "none"
                            ? `${this.state.clas}, level ${this.state.min_lvl}-${this.state
                                  .max_lvl}`
                            : ""}
                    </span>
                    <ul className="container ul-none">
                        {spells}
                    </ul>
                </div>
            </div>
        );
    }
}
