import { Faders } from "phosphor-react";
import { useState, useEffect } from "react";
import Button from "./Button";
import CircleSettings, { Inputs } from "./CircleSettings";
import Footer from "./Footer";
import Sketch from "./Sketch";

const App: React.FC = () => {
  const [gameResult, setGameResult] = useState<"won" | "lost">();
  const [wins, setWins] = useState(0);
  const [circleSketch, setCircleSketch] = useState<Inputs>();
  const [jiggliness, setJiggliness] = useState(0);

  useEffect(() => {
    if (gameResult === "won") {
      setWins(wins + 1);
    }
    if (wins === 3) {
      //enter winner board
    }
  }, [gameResult]);
  return (
    <div>
      <div className="drawer">
        <input id="settings-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <div className="bg-[#3A3042] flex justify-between px-2 gap-2 ">
            <h1 className="text-[#EDFFD9] text-4xl">CIRCLES</h1>
            <div onClick={() => setGameResult(undefined)}>
              <Button
                form="settings"
                type="submit"
                text={gameResult ? "Play again" : "Start game"}
                variant
              />
            </div>
            <button>
              <label htmlFor="settings-drawer">
                <Faders size={24} className="text-[#EDFFD9]" />
              </label>
            </button>
          </div>
          <div className="bg-[#315964]">
            {circleSketch && gameResult === undefined && (
              <Sketch
                circleSketch={circleSketch}
                jiggliness={jiggliness}
                setGameResult={setGameResult}
              />
            )}
            {gameResult === "won" && (
              <h1 className="text-[#EDFFD9] text-9xl text-center ">WINNER</h1>
            )}
            {gameResult === "lost" && (
              <h1 className="text-[#EDFFD9] text-9xl text-center ">YOU LOSE</h1>
            )}
          </div>
          <Footer />
        </div>
        <div className="drawer-side">
          <label htmlFor="settings-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 bg-[#DB9D47] max-w-xs">
            <CircleSettings setCircleSketch={setCircleSketch} />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
