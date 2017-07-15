import React, { Component } from "react";
import PageNav from "./pagenav";
import FilterableSpellList from "./filterablespelllist";

export default class SpellPage extends Component {
    constructor(props) {
        super(props);
        this.state = { spells: [] };
    }
    getSpellList() {
        fetch("/api/spells")
            .then(response => response.json())
            .then(json => {
                this.setState({
                    spells: json
                });
            })
            .catch(err => {
                console.log("parsing failed", err);
            });
    }
    componentDidMount() {
        this.getSpellList();
    }
    render() {
        return (
            <div className="SpellPage">
                <FilterableSpellList filterCol="name" spells={this.state.spells} />
            </div>
        );
    }
}
