import { Faders } from "phosphor-react";
import { useState, useEffect } from "react";
import Button from "./Button";
import CircleSettings, { Inputs } from "./CircleSettings";
import Footer from "./Footer";
import Sketch from "./Sketch";

const App: React.FC = () => {
  const [gameResult, setGameResult] = useState<"won" | "lost">();
  const [gameLive, setGameLive] = useState(false);
  const [wins, setWins] = useState(0);
  const [circleSketch, setCircleSketch] = useState<Inputs>();

  const startGame = () => {
    setGameResult(undefined);
    setGameLive(true);
  };

  useEffect(() => {
    if (gameResult === "won") {
      setWins(wins + 1);
    }
    if (wins === 3) {
      //enter winner board
    }
  }, [gameResult]);

  const buttonText = () => {
    if (gameResult) {
      return "Play again";
    }
    if (gameLive) {
      return "Repeatedly click that circle!";
    }
    return "Start game";
  };

  return (
    <div>
      <div className="drawer">
        <input id="settings-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <div className="bg-[#3A3042] flex justify-between px-2">
            <h1 className="text-[#EDFFD9] h-[35px] text-4xl xl:text-7xl xl:h-[66px]">
              CIRCLES
            </h1>
            <div onClick={() => startGame()} className="self-center">
              <Button
                form="settings"
                type="submit"
                text={buttonText()}
                variant
                disabled={gameLive}
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
                setGameResult={setGameResult}
                setGameLive={setGameLive}
              />
            )}
            <h1 className="text-[#EDFFD9] text-5xl md:text-9xl place-content-center grid">
              {gameResult === "won" && "WINNER"}
              {gameResult === "lost" && "YOU LOSE"}
            </h1>
          </div>
          <Footer />
        </div>
        <div className="drawer-side">
          <label htmlFor="settings-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 bg-[#EDFFD9]/50 w-48 pt-10 xl:pt-20">
            <CircleSettings setCircleSketch={setCircleSketch} />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
