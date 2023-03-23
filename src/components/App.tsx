import { useState, useEffect } from "react";
import CircleSettings, { Settings } from "./CircleSettings";
import Game from "./Game";
import Header from "./Header";
import Level00 from "./Level00";


const App: React.FC = () => {
  const [gameResult, setGameResult] = useState<"won" | "lost" | undefined>(undefined);
  const [gameLive, setGameLive] = useState(false);
  const [settings, setSettings] = useState<Settings>({ radius: 60, colour1: "#3A3042", colour2: "#EDFFD9", jiggliness: 5 });
  const [level, setLevel] = useState(1);
  const [message, setMessage] = useState("");


  const startGame = () => {
    if (gameLive === false) {
      setGameResult(undefined);
      setGameLive(true);
    }
    return;
  };

  useEffect(() => {
    if (gameResult === "won") {
      setLevel(level + 1);
    }
  }, [gameResult]);
  console.log("settings: ", settings)

  return (
    <>
          <Header
            gameLive={gameLive}
            gameResult={gameResult}
            level={level}
            message={message}
            startGame={startGame}
          />
          <div className="bg-[#315964]">
            <h1 className="text-[#EDFFD9] text-5xl md:text-9xl place-content-center grid">
              {gameResult === "won" && "WINNER"}
              {gameResult === "lost" && "YOU LOSE"}
            </h1>
            {settings && gameLive 
            ? <Game
            settings={settings}
            setGameResult={setGameResult}
            setGameLive={setGameLive}
            level={level}
            setMessage={setMessage}
            />
            : <Level00 settings={settings}/> }
          </div>
        </>
  );
};

export default App;
