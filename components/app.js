import React from "react";
import { render } from "react-dom";
import { HashRouter, Route } from "react-router-dom";

import HomePage from "./homepage";
import SpellPage from "./spellpage";
import FeatPage from "./featpage";
import PageNav from "./pagenav";
import Footer from "./footer";

const App = () =>
    <HashRouter basename={"/"}>
        <div className="page bg-bluewhite">
            <PageNav />
            <Route component={HomePage} exact path="/" />
            <Route component={SpellPage} path="/spells" />
            <Route component={FeatPage} path="/feats" />
            <Footer />
        </div>
    </HashRouter>;

render(<App />, document.getElementById("page"));
