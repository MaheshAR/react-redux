import React from 'react';

const ProgressBar = ({value, totalValue}) => {
    const percentage = (100 - (((+value) * 100)/(+totalValue))).toString() + '%'
    return(
        <div className="progress-bar-wrapper">
            <div className="progress-bar-div">
                <span className="progress-bar-fill" style={{width: percentage}}></span>
                <span className="progress-bar-number">{percentage}</span>
            </div>
        </div>
    );
};

export default ProgressBar;