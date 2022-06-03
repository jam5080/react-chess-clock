import React, {useState, useEffect} from "react";

const ChessClock = ({ min1 = 0, sec1 = 10, min2 = 0, sec2 = 10 }) => {
    const [running1, setRunning1] = useState(false);
    const [running2, setRunning2] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [[m1, s1], setTime1] = useState([min1, sec1]);
    const [[m2, s2], setTime2] = useState([min2, sec2]);
  
    const Clock1 = () => {
      if (!running1 || gameOver) return;
      if (m1 === 0 && s1 === 0) setGameOver(true);
      else if (s1 === 0) {
        setTime1([m1 - 1, 59]);
      } else {
        setTime1([m1, s1 - 1]);
      }
    };

    const Clock2 = () => {
        if (!running2 || gameOver) return;
        if (m2 === 0 && s2 === 0) setGameOver(true);
        else if (s2 === 0) {
          setTime2([m2 - 1, 59]);
        } else {
          setTime2([m2, s2 - 1]);
        }
      };
  
    const reset = () => {
      setTime1([parseInt(min1), parseInt(sec1)]);
      setTime2([parseInt(min2), parseInt(sec2)]);
      setRunning1(false);
      setRunning2(false);
      setGameOver(false);
    };
  
    useEffect(() => {
      const timerID = setInterval(() => Clock1(), 1000);
      return () => clearInterval(timerID);
    });

    useEffect(() => {
        const timerID = setInterval(() => Clock2(), 1000);
        return () => clearInterval(timerID);
      });
  
    return (
    <div className="chessClock">
        <div className="split left">
            <div className="centered">
                <p>{`${m1.toString().padStart(2, '0')}:${s1.toString().padStart(2, '0')}`}</p>
            </div>
        </div>
        <div className="split right">
            <div className="centered">
                <p>{`${m2.toString().padStart(2, '0')}:${s2.toString().padStart(2, '0')}`}</p>
            </div>
        </div>
    
    <div className="split2">
        <div className="centered">
            {!running1 && !running2 && (
                <button className="btn" onClick={() => setRunning1(true)}>Start Game</button>
            )}
            {(running1 || running2) &&  (
                <button className="btn" onClick={() => setRunning1(!running1) & setRunning2(!running2) }> {!running1 ? 'White Clock' : 'Black Clock'} </button>
            )}
            <button className="btn" onClick={() => reset()}>Restart</button>
        </div>
    </div>
    <div className="hidden">
        {gameOver && m1 === 0 && s1 === 0 && (console.log("Black Wins!"))}
        {gameOver && m2 === 0 && s2 === 0 && (console.log("White Wins!"))}
        </div>
    </div>
    
    );
  };
export default ChessClock;