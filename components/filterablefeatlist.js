// @flow
import React, { Component } from "react";
import FilterableFeat from "./filterablefeat";
import ChosenFeat from "./chosenfeat";
import ExpandableForm from "./ExpandableForm";

export default class FilterableFeatList extends Component {
    props: {
        feats: Feat[]
    };
    state: {
        filter: string,
        filterType: "all" | "prereqs",
        moreForm: boolean,
        prereqs: Set<string>
    };
    constructor() {
        super();
        this.state = {
            filter: "",
            filterType: "all",
            moreForm: false,
            prereqs: new Set()
        };
        this.addFeat = this.addFeat.bind(this);
        this.removeFeat = this.removeFeat.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.handleShowMore = this.handleShowMore.bind(this);
    }
    handleFilterChange(e: Event & { currentTarget: HTMLInputElement }) {
        this.setState({
            filter: e.currentTarget.value.toLowerCase()
        });
    }
    handleShowMore() {
        this.setState({ moreForm: !this.state.moreForm });
    }
    handleRadioChange(e: Event & { currentTarget: HTMLInputElement }) {
        this.setState({
            filterType: e.currentTarget.value,
            moreForm: false
        });
    }
    addFeat(featName: string) {
        if (this.state.filterType === "prereqs") {
            this.setState(currentState => ({
                prereqs: currentState.prereqs.add(featName)
            }));
        }
    }
    removeFeat(featName: string) {
        if (this.state.filterType === "prereqs") {
            this.setState(currentState => ({
                prereqs: new Set([...currentState.prereqs].filter(prereq => prereq !== featName))
            }));
        }
    }
    componentWillUpdate() {
        // localStorage.feats_state = JSON.stringify(this.state);
    }
    render() {
        var feats = null;
        var chosenfeats = null;

        if (this.props.feats.length) {
            feats = this.props.feats
                .filter(feat => {
                    // match for prerequisites (if applicable)
                    if (this.state.filterType === "prereqs" && feat.prerequisite_feats.length) {
                        var featPrereqs = feat.prerequisite_feats.split(",");
                        var hasAllPrereqs = featPrereqs.every(prereq =>
                            this.state.prereqs.has(prereq)
                        );

                        return hasAllPrereqs;
                    }
                    return true;
                })
                .filter(feat => feat.name.toLowerCase().indexOf(this.state.filter) !== -1)
                .splice(0, 50)
                .map(feat => <FilterableFeat key={feat.id} feat={feat} addFeat={this.addFeat} />);
        }

        if (this.state.prereqs.size && this.state.filterType === "prereqs") {
            chosenfeats = this.props.feats
                .filter(feat => this.state.prereqs.has(feat.name))
                .map(feat => <ChosenFeat key={feat.id} feat={feat} removeFeat={this.removeFeat} />);
        }

        return (
            <div>
                <ExpandableForm
                    inputPlaceholder="Filter feats..."
                    handleFilterChange={this.handleFilterChange}
                    handleShowMore={this.handleShowMore}
                    showMore={this.state.moreForm}
                >
                    <div className="p-05e">
                        <input
                            defaultChecked
                            id="all"
                            name="filter-type"
                            onChange={this.handleRadioChange}
                            type="radio"
                            value="all"
                        />
                        <label className="p-05e" htmlFor="all">
                            Filter all feats
                        </label>
                        <input
                            id="prereqs"
                            name="filter-type"
                            onChange={this.handleRadioChange}
                            type="radio"
                            value="prereqs"
                        />
                        <label className="p-05e" htmlFor="prereqs">
                            Filter by prerequisites
                        </label>
                    </div>
                </ExpandableForm>
                <div className="bg-bluewhite">
                    <ul className="container ul-none">
                        {chosenfeats}
                    </ul>
                </div>
                <div className="bg-white">
                    <ul className="container ul-none">
                        {feats}
                    </ul>
                </div>
            </div>
        );
    }
}
