// @flow
import React from "react";

export default function ClassRadio(props: {
    checked: boolean,
    name: string,
    label: string,
    value: string,
    onChange: (Event & { currentTarget: HTMLInputElement }) => void
}) {
    return (
        <div className="p-05e">
            <input
                checked={props.checked}
                id={props.name}
                name={props.name}
                onChange={props.onChange}
                type="radio"
                value={props.value}
            />
            <label htmlFor={props.name} style={{ paddingLeft: ".25em" }}>
                {props.label}
            </label>
        </div>
    );
}
