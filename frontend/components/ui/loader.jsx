import React from "react";

const Loader = ({className}) => {
    return (
        //I did not write this, From Uiverse.io by mobinkakei
        <div className={`wrapper ${className}`}>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
        </div>
    );
};

export default Loader;