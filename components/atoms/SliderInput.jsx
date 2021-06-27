// @flow
import React from "react";

export default function SliderInput(props: {
    defaultValue: number,
    max: number,
    min: number,
    handleChange: (Event & { currentTarget: HTMLInputElement }) => void,
    label: string,
    name: string
}) {
    return (
        <div className="flex">
            <label htmlFor={props.name}>
                {props.label || props.name}
            </label>
            <input
                id={props.name}
                name={props.name}
                type="range"
                min={props.min}
                max={props.max}
                defaultValue={props.defaultValue}
                onChange={props.handleChange}
            />
        </div>
    );
}
