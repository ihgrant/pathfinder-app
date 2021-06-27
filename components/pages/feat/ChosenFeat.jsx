// @flow
import React from "react";
import DeleteIcon from "../../atoms/DeleteIcon";

export default function ChosenFeat(props: { feat: Feat, removeFeat: string => void }) {
    return (
        <li className="p-05e" onClick={() => props.removeFeat(props.feat.name)}>
            <DeleteIcon classes="icon-1-5e fill-white fl-l" />
            <p className="m-0">
                <span className="bold">
                    {`${props.feat.name}:`}
                </span>
                {props.feat.description}
            </p>
        </li>
    );
}
