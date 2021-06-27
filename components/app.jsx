import React from "react";
import { render } from "react-dom";
import { HashRouter, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SpellPage from "./pages/spell/SpellPage";
import FeatPage from "./pages/feat/FeatPage";
import PageNav from "./PageNav";
import Footer from "./Footer";

function App() {
    return <HashRouter basename="/">
        <div className="page bg-bluewhite">
            <PageNav />
            <Route component={HomePage} exact path="/" />
            <Route component={SpellPage} path="/spells" />
            <Route component={FeatPage} path="/feats" />
            <Footer />
        </div>
    </HashRouter>;
}

render(<App />, document.getElementById("page"));
