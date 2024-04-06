import './NavButton.css';
import React from "react";

export function BrowseButton({OnBrowseButtonClick}) {
    return (
        <button className="tab" onClick={OnBrowseButtonClick}>Browse</button>
    )
}