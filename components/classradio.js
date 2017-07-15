// @flow
import React from "react";

export default function ClassRadio(props: {
    name: string,
    value: string,
    defaultChecked: boolean,
    onChange: () => void
}) {
    return (
        <label className="p-05e" htmlFor={props.name}>
            <input
                defaultChecked={props.defaultChecked}
                id={props.name}
                name={props.name}
                onChange={props.onChange}
                type="radio"
                value={props.value}
            />
            {props.name}
        </label>
    );
}
