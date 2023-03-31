import { Faders } from "phosphor-react";
import Button from "./Button";

type HeaderProps = {
  gameLive: boolean;
  gameResult: "won" | "lost" | undefined;
  level: number;
  message: string;
  startGame: () => void;
};

const Header: React.FC<HeaderProps> = ({
  gameLive,
  gameResult,
  level,
  message,
  startGame,
}) => {
  const text = () => {
    if (!gameLive && gameResult === undefined) {
      return "Start";
    }
    if (gameResult === "lost") {
      return "Replay";
    }
    if (gameResult === "won") {
      return `Level ${level}`;
    }
  };

  return (
    <div className="bg-[#3A3042] flex justify-between px-2 select-none">
      <h1 className="text-[#EDFFD9] h-[35px] text-4xl xl:text-7xl xl:h-[66px] left-2">
        <a href="https://r-pal.github.io">CIRCLES</a>
      </h1>
      {!gameLive && (
        <div onClick={() => startGame()} className="self-center">
          <Button form="settings" type="submit" text={text()} header />
        </div>
      )}
      <div className="text-[#EDFFD9] self-center">{message}</div>
      {/* <button>
        <label htmlFor="settings-drawer">
          <Faders size={24} className="text-[#EDFFD9]" />
        </label>
      </button> */}
    </div>
  );
};

export default Header;
