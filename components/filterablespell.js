import React from "react";

export default function FilterableSpell(props) {
    return (
        <li className="p-1e">
            <h3 className="m-t-0">
                {props.spell.name}
            </h3>
            <p className="m-05e italic color-aaa">{`${props.spell.school}; ${props.spell
                .spell_level}`}</p>
            <ul>
                <li>{`casting time: ${props.spell.casting_time}`}</li>
                <li>{`range: ${props.spell.range}`}</li>
                {props.spell.area.length ? <li>{`area: ${props.spell.area}`}</li> : null}
                <li>{`duration: ${props.spell.duration}`}</li>
                <li>{`saving throw: ${props.spell.saving_throw}`}</li>
            </ul>
            <p className="m-b-0">
                {props.spell.description}
            </p>
        </li>
    );
}
