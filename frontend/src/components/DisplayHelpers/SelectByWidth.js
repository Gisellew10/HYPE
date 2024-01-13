import React, { useEffect, useRef, useState } from "react";

function SelectByWidth(arrayOfWidthsAndFunctions) {
    // arrayOfWidthsAndFunctions is an array of objects with two attributes:
    // width: the minimum width of the screen in pixels for the associated display function
    // function: a function which returns a component to display when the screen is at least as wide as the associated width

    const ref = useRef(0);

    function getDisplayFunction() {
        let currentDisplayFunction = () => <React.Fragment></React.Fragment>;
        if (arrayOfWidthsAndFunctions && arrayOfWidthsAndFunctions.length !== 0) {
            let largestWidth = -1;

            for (let i = 0; i < arrayOfWidthsAndFunctions.length; i++) {
                if (largestWidth < arrayOfWidthsAndFunctions[i].width && arrayOfWidthsAndFunctions[i].width <= ref.current.offsetWidth) {
                    largestWidth = arrayOfWidthsAndFunctions[i].width;
                    currentDisplayFunction = arrayOfWidthsAndFunctions[i].function;
                }
            }
        }
        return currentDisplayFunction;
    }

    return <div ref={ref} style={{width: "100%", height: "100%", margin: "0 0 0 0", padding: "0 0 0 0"}}>
        {getDisplayFunction()()}
    </div>
}

export default SelectByWidth;