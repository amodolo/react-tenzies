import React from "react";

function Die({value, isHeld, hold}) {
    return (
        <div className={`die--face ${isHeld ? "held" : ""}`} onClick={hold}>
            <span className="pip"></span>
            {value > 1 && <span className="pip"></span>}
            {value > 2 && <span className="pip"></span>}
            {value > 3 && <span className="pip"></span>}
            {value > 4 && <span className="pip"></span>}
            {value > 5 && <span className="pip"></span>}
            {value > 6 && <span className="pip"></span>}
        </div>
    );
}

export default Die;
