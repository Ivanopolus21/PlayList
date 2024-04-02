import React from "react";
import './NavButton.css';
export function BrowseButton({OnBrowseButtonClick}) {
    return (
        <button className="tab" onClick={OnBrowseButtonClick}>Browse</button>
    )
}