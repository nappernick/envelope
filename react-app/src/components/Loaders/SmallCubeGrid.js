import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import { DoubleBounce } from "better-react-spinkit"


function SmallCubeGrid(props) {
    const { promiseInProgress } = usePromiseTracker({
        area: props.areas,
        delay: 0,
    });
    console.log("SML CUBE PROMISE IN PROGRESS: ", promiseInProgress)
    return (
        <>
            {promiseInProgress && (
                <div className="spinner">
                    <DoubleBounce size={16} />
                </div>
            )}
        </>
    )
}

export default SmallCubeGrid
