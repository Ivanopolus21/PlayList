import React from "react";
import './NavButton.css';
export function LibraryButton({OnLibraryButtonClick}) {
    return (
        <button className="tab" onClick={OnLibraryButtonClick}>Library</button>
    )
}