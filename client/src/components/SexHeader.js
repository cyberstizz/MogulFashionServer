import React from "react";
import './SexHeader.scss';

const SexHeader = (props) => {
    //destructure prop
    const {header} = props;
    return (
        <div className="SexHeaderText">{header}</div>
    )
}


export default SexHeader;