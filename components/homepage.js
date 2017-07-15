import React from "react";
import { Link } from "react-router-dom";

export default function HomePage(props) {
    return (
        <div className="container">
            <h1 className="a-c">
                {"Home"}
            </h1>
            <ul>
                <li>
                    <Link to="spells">
                        {"Spells"}
                    </Link>
                </li>
                <li>
                    <Link to="feats">
                        {"Feats"}
                    </Link>
                </li>
            </ul>
        </div>
    );
}
