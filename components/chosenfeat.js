import React from "react";
import DeleteIcon from "./deleteicon";

export default function ChosenFeat(props) {
    return (
        <li className="p-05e" onClick={props.removeFeat} data-id={props.feat.id}>
            <DeleteIcon classes="icon-1-5e fill-white fl-l" />
            <p className="m-0">
                <span className="bold">
                    {props.feat.name + ": "}
                </span>
                {props.feat.description}
            </p>
        </li>
    );
}
