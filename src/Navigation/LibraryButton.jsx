import './NavButton.css';
import React from "react";

export function LibraryButton({OnLibraryButtonClick}) {
    return (
        <button className="tab" onClick={OnLibraryButtonClick}>Library</button>
    )
}