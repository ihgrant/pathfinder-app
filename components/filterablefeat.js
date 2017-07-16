// @flow
import React from "react";
import PlusIcon from "./plusicon";

export default function FilterableFeat(props: { addFeat: string => void, feat: Feat }) {
    return (
        <li className="p-1e" onClick={() => props.addFeat(props.feat.name)}>
            <PlusIcon classes="icon-1-5e fill-bluewhite fl-l" />
            <h3 className="m-t-0">
                {props.feat.name}
            </h3>
            <p className="m-05e italic color-aaa">
                {`${props.feat.type}; ${props.feat.prerequisites.length
                    ? `Requires ${props.feat.prerequisites}`
                    : "No prerequisites"}`}
            </p>
            <p className="m-b-0">
                {props.feat.benefit}
            </p>
            {props.feat.special.length
                ? <p className="m-b-0">
                      {props.feat.special}
                  </p>
                : null}
        </li>
    );
}
