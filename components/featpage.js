import React, { Component } from "react";
import PageNav from "./pagenav";
import FilterableFeatList from "./filterablefeatlist";

export default class FeatPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feats: []
        };
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
