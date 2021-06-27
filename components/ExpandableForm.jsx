// @flow
import React from "react";

export default function ExpandableForm(props: {
    children: any,
    handleFilterChange: Event => void,
    handleShowMore: Event => void,
    inputPlaceholder: string,
    showMore: boolean
}) {
    return (
        <div className="bg-teal">
            <form className="pos-rel">
                <div className="flex container">
                    <input
                        autoFocus
                        className="flex-1 boxstyle bg-i"
                        onChange={props.handleFilterChange}
                        placeholder={props.inputPlaceholder}
                        type="search"
                    />
                    <button
                        className="boxstyle bg-i"
                        onClick={props.handleShowMore}
                        type="button"
                        style={{ width: "5em" }}
                    >
                        {props.showMore ? "Less..." : "More..."}
                    </button>
                </div>
                <div
                    className={
                        "flex w-100 boxstyle bg-teal abs-top ani-slide hidden shadow " +
                        (props.showMore ? " h-18e" : " h-0")
                    }
                    style={{ flexDirection: "column" }}
                >
                    {props.children}
                </div>
            </form>
        </div>
    );
}
