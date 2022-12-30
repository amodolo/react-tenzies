import React from "react";

function ScoreBoard({score}) {
    return (
        <>
            <div>
                Rolls
                <div className="score--value">{score.rolls}</div>
            </div>
            <div>
                Seconds
                <div className="score--value">{score.seconds}</div>
            </div>
        </>
    );
}

export default ScoreBoard;
