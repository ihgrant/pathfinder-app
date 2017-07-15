import React from "react";
import { render } from "react-dom";
import { HashRouter, Route } from "react-router-dom";

var HomePage = require("./homepage");
var SpellPage = require("./spellpage");
var FeatPage = require("./featpage");
var PageNav = require("./pagenav");
var Footer = require("./footer");

const App = () =>
    <HashRouter basename={"/"}>
        <div>
            <PageNav />
            <Route component={HomePage} exact path="/" />
            <Route component={SpellPage} path="/spells" />
            <Route component={FeatPage} path="/feats" />
            <Footer />
        </div>
    </HashRouter>;

render(<App />, document.getElementById("page"));
