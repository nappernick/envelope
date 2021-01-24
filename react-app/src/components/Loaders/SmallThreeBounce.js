import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import { ThreeBounce } from "better-react-spinkit"


function SmallThreeBounce(props) {
    const { promiseInProgress } = usePromiseTracker({
        area: props.areas,
        delay: 0,
    });

    return (
        <>
            {promiseInProgress && (
                <div className="spinner">
                    <ThreeBounce
                        size={10}
                        color="#83c2c1"
                        duration=".7s"
                    />
                </div>
            )}
        </>
    )
}

export default SmallThreeBounce
