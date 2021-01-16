import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import { Circle } from "better-react-spinkit"

export const Spinner = (props) => {
    const { promiseInProgress } = usePromiseTracker({
        area: props.areas,
        delay: 0,
    });
    // debugger
    // console.log("CIRCLE PROMISE IN PROGRESS: ", promiseInProgress)
    return (
        <>
            {promiseInProgress && (
                <div className="spinner" >
                    <Circle size={100} color={"#63a9ae"} />
                </div>
            )}
        </>
    );
};

export default Spinner;
