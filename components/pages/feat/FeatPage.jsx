// @flow
import React, { Component } from "react";
import PageNav from "../../PageNav";
import FilterableFeatList from "./FilterableFeatList";

export default class FeatPage extends Component {
    state: {
        feats: Feat[]
    };
    constructor() {
        super();
        this.state = { feats: [] };
    }
    getFeatList() {
        fetch("/api/feats")
            .then(response => response.json())
            .then(json => {
                this.setState({
                    feats: json
                });
            })
            .catch(err => {
                console.log("parsing failed", err);
            });
    }
    componentWillMount() {
        this.getFeatList();
    }
    render() {
        return (
            <div className="FeatPage">
                <FilterableFeatList feats={this.state.feats} />
            </div>
        );
    }
}
