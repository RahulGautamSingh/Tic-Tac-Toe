import { useState } from "react";
import Square from "./Square";
import State from "./State";

export default function Board() {
  let [square, setSquare] = useState(new Array(9).fill(" "));
  let [history, setHistory] = useState([new Array(9).fill(" ")]);
  let [value, setValue] = useState("X");
  let [status, setStatus] = useState("Next Player : X");
  function changeVal(index) {
    let squaresCopy = square.slice();
    let historyCopy = history.slice();
    if (squaresCopy[index] === " ") {
      squaresCopy[index] = value;
      setSquare(squaresCopy);

      historyCopy.push(squaresCopy);
      setHistory(historyCopy);

      // console.log(history);
      if (value === "X") {
        setValue("O");
        if (status[0] !== "W") setStatus("Next Player : O");
      } else {
        setValue("X");
        if (status[0] !== "W") setStatus("Next Player : X");
      }
    } else setSquare(squaresCopy);
  }
  function displayStatus(square, val) {
    // console.log(flagGlo)
    if (status[0] === "W") return status;

    let arr = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 7],
    ];
    let flag = true;
    let player;
    for (let combo of arr) {
      if (
        square[combo[0]] === square[combo[1]] &&
        square[combo[1]] === square[combo[2]] &&
        square[combo[0]] !== " "
      ) {
        flag = false;
        player = square[combo[0]];
      }
    }
    if (flag) return status;
    else {
      setStatus("Winner : " + player);
      return status;
    }
  }

  function displayHistory(index) {
    // console.log(history[index])
    // console.log(history)
    setSquare(history[index]);

    setHistory(history.slice(0, index + 1));
    
    if (index % 2 === 0) {
      setValue("X");
      setStatus("Next Player : X");
    } else {
      setValue("O");
      setStatus("Next Player : O");
    }

    if (index === 0) {
      setHistory([new Array(9).fill(" ")]);
      setValue("X");
      setStatus("Next Player : X");
    }
  }

  return (
    <>
      <div className="status">{displayStatus(square)}</div>
      <div className="grid">
        <Square value={square[0]} index={0} clicksHandler={changeVal} />
        <Square value={square[1]} index={1} clicksHandler={changeVal} />
        <Square value={square[2]} index={2} clicksHandler={changeVal} />
        <Square value={square[3]} index={3} clicksHandler={changeVal} />
        <Square value={square[4]} index={4} clicksHandler={changeVal} />
        <Square value={square[5]} index={5} clicksHandler={changeVal} />
        <Square value={square[6]} index={6} clicksHandler={changeVal} />
        <Square value={square[7]} index={7} clicksHandler={changeVal} />
        <Square value={square[8]} index={8} clicksHandler={changeVal} />
      </div>

      <div className="states">
        {history.map((elem, index) => {
          return (
            <State
              value={index === 0 ? "Start Game" : index + "State - "}
              clicked={displayHistory}
              index={index}
            />
          );
        })}
      </div>
    </>
  );
}
