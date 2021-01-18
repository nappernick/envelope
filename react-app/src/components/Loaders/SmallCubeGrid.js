import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import { DoubleBounce } from "better-react-spinkit"


function SmallCubeGrid(props) {
    const { promiseInProgress } = usePromiseTracker({
        area: props.areas,
        delay: 0,
    });
    
    return (
        <>
            {promiseInProgress && (
                <div className="spinner">
                    <DoubleBounce size={5} />
                </div>
            )}
        </>
    )
}

export default SmallCubeGrid
