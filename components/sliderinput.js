// @flow
import React from "react";

export default function SliderInput(props: {
    defaultValue: string,
    max: number,
    min: number,
    handleChange: () => void,
    label: string,
    name: string
}) {
    return (
        <div>
            <label htmlFor={props.name}>
                <input
                    id={props.name}
                    name={props.name}
                    type="range"
                    min={props.min}
                    max={props.max}
                    defaultValue={props.defaultValue}
                    onChange={props.handleChange}
                />
                {props.label || props.name}
            </label>
        </div>
    );
}
