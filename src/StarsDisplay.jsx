import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { range } from "./utils";
import "./App.css";

const StarsDisplay = props => {
 return (
  <div className="grid-container">
   {range(1, props.count).map(starId => (
    <div key={starId} className="grid-item">
     <FontAwesomeIcon icon={faStar} />
    </div>
   ))}
  </div>
 );
};

export { StarsDisplay };
