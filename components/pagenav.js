import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";

export default function PageNav(props) {
    var classes = classnames({
        "tbl-cell": true,
        "p-05e": true
    });
    return (
        <div className="bg-purple">
            <div className="container">
                <div className="tbl w-100">
                    <div className="tbl-row">
                        <Link className={classes} to="home">
                            {"Home"}
                        </Link>
                        <Link className={classes} to="spells">
                            {"Spells"}
                        </Link>
                        <Link className={classes} to="feats">
                            {"Feats"}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
