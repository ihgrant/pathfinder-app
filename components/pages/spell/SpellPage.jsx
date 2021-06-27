// @flow
import React, { Component } from "react";
import PageNav from "../../PageNav";
import FilterableSpellList from "./FilterableSpellList";

export default class SpellPage extends Component {
    state: {
        spells: Spell[]
    };
    constructor() {
        super();
        this.state = { spells: [] };
    }
    getSpellList() {
        fetch(`/api/spells`)
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
            <div className="page-container">
                <FilterableSpellList filterCol="name" spells={this.state.spells} />
            </div>
        );
    }
}
