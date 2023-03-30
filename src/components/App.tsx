import { useState, useEffect } from "react";
import CircleSettings, { Settings } from "./CircleSettings";
import Game from "./Game";
import Header from "./Header";
import Level00 from "./Level00";

const App: React.FC = () => {
  const [gameResult, setGameResult] = useState<"won" | "lost" | undefined>(
    undefined
  );
  const [gameLive, setGameLive] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    radius: 60,
    colour1: "#3A3042",
    colour2: "#EDFFD9",
    jiggliness: 3,
  });
  const [level, setLevel] = useState(1);
  const [message, setMessage] = useState("");
  const [timeElapsed, setTimeElapsed] = useState(0);

  const startGame = () => {
    if (gameLive === false) {
      setGameResult(undefined);
      setGameLive(true);
      setTimeElapsed(0);
    }
    return;
  };

  useEffect(() => {
    if (gameResult === "won") {
      setLevel(level + 1);
    }
  }, [gameResult]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (gameLive) {
      interval = setInterval(() => setTimeElapsed((prev) => prev + 1), 1000);
    } else {
      clearInterval(interval);
      setTimeElapsed(0);
    }
    return () => clearInterval(interval);
  }, [gameLive]);

  return (
    <>
      <Header
        gameLive={gameLive}
        gameResult={gameResult}
        level={level}
        message={message}
        startGame={startGame}
      />
      <div className="bg-[#315964] relative">
        <div>
          {gameLive ? (
            <Game
              settings={settings}
              setGameResult={setGameResult}
              setGameLive={setGameLive}
              level={level}
              setMessage={setMessage}
            />
          ) : (
            <Level00 settings={settings} />
          )}
        </div>
        <div className="absolute right-0 bottom-0 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <h1
            className={`text-[#EDFFD9] text-5xl md:text-9xl place-content-center grid pointer-events-none`}
          >
            {gameResult === "won" && "WINNER"}
            {gameResult === "lost" && "YOU LOSE"}
            {gameLive && timeElapsed}
          </h1>
        </div>
      </div>
    </>
  );
};

export default App;
