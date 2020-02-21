import React, { useState, useEffect } from "react";
import { PlayNumber } from "./PlayNumber";
import { StarsDisplay } from "./StarsDisplay";
import { PlayAgain } from "./PlayAgain";
import { sum, random, randomSumIn, range } from "./utils";
import "./Game.css";

const Game = props => {
 const [stars, setStars] = useState(random(1, 9));
 const [availableNums, setAvailableNums] = useState(range(1, 9));
 const [candidateNums, setCandidateNums] = useState([]);
 const [secondsLeft, setSecondsLeft] = useState(10);

 useEffect(() => {
  if (secondsLeft > 0 && availableNums.length > 0) {
   const timerId = setTimeout(() => {
    setSecondsLeft(secondsLeft - 1);
   }, 1000);
   return () => clearTimeout(timerId);
  }
 });

 const candidatesAreWrong = sum(candidateNums) > stars;
 const gameStatus =
  availableNums.length === 0 ? "won" : secondsLeft === 0 ? "lost" : "active";

 const numberStatus = number => {
  if (!availableNums.includes(number)) {
   return "used";
  }
  if (candidateNums.includes(number)) {
   return candidatesAreWrong ? "wrong" : "candidate";
  }
  return "available";
 };

 const onNumberClick = (number, currentStatus) => {
  if (gameStatus !== "active" || currentStatus === "used") {
   return;
  }

  const newCandidateNums =
   currentStatus === "available"
    ? candidateNums.concat(number)
    : candidateNums.filter(cn => cn !== number);

  if (sum(newCandidateNums) !== stars) {
   setCandidateNums(newCandidateNums);
  } else {
   const newAvailableNums = availableNums.filter(
    n => !newCandidateNums.includes(n)
   );
   setStars(randomSumIn(newAvailableNums, 9));
   setAvailableNums(newAvailableNums);
   setCandidateNums([]);
  }
 };
 return (
  <div className="game">
   <div className="grid-item-header">
    Pick 1 or more number that sum to number os star
   </div>
   <div className="grid-item">
    <div className="grid-container">
     <div className="grid-item">
      {gameStatus !== "active" ? (
       <PlayAgain onClick={props.startNewGame} gameStatus={gameStatus} />
      ) : (
       <StarsDisplay count={stars} />
      )}
     </div>
    </div>
   </div>
   <div className="grid-item">
    <div className="grid-container">
     {range(1, 9).map(number => (
      <PlayNumber
       key={number}
       status={numberStatus(number)}
       number={number}
       onClick={onNumberClick}
      />
     ))}
    </div>
   </div>
   <div className="grid-item-header">Time is remaing: {secondsLeft}</div>
  </div>
 );
};

export { Game };
