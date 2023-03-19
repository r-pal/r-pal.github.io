import { Faders } from "phosphor-react";
import { useState, useEffect } from "react";
import Button from "./Button";
import CircleSettings, { Settings } from "./Settings";
import Footer from "./Footer";
import Game from "./Game";

const App: React.FC = () => {
  const [gameResult, setGameResult] = useState<"won" | "lost">();
  const [gameLive, setGameLive] = useState(false);
  const [settings, setSettings] = useState<Settings>();
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
                text={
                  gameLive
                    ? "Restart level"
                    : gameResult
                    ? `Level ${level}`
                    : "Start game"
                }
                variant
              />
            </div>
            <div className="text-[#EDFFD9] self-center">{message}</div>
            <button>
              <label htmlFor="settings-drawer">
                <Faders size={24} className="text-[#EDFFD9]" />
              </label>
            </button>
          </div>
          <div className="bg-[#315964]">
            {settings && gameResult === undefined && (
              <Game
                settings={settings}
                setGameResult={setGameResult}
                setGameLive={setGameLive}
                level={level}
                setMessage={setMessage}
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
            <CircleSettings setSettings={setSettings} />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
