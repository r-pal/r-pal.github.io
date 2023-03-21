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
    if (gameLive === false) {
      setGameResult(undefined);
      setGameLive(true);
    }
    return;
  };

  useEffect(() => {
    if (gameResult === "won") {
      setWins(wins + 1);
    }
    if (wins === 3) {
      //enter winner board
    }
  }, [gameResult]);
  console.log(gameLive);

  return (
    <>
      <Header />
      <div className="bg-[#3A3042] h-max">
        <Table />
       <MousePosition
          mousePos={mousePos}
          circleStart={circleStart}
          circleEnd={circleEnd}
        />
      </div>
    </div>
  );
};

export default App;
