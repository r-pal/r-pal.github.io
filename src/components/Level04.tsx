import { P5CanvasInstance, ReactP5Wrapper } from "react-p5-wrapper";
import { canvasWidth, canvasHeight } from "../constants/canvas";
import { Settings } from "./CircleSettings";

type Level04Props = {
  settings: Settings;
  setGameResult: (value: "won" | "lost" | undefined) => void;
  setGameLive: (value: boolean) => void;
  setMessage: (value: string) => void;
};

const Level04: React.FC<Level04Props> = ({
  settings,
  setGameResult,
  setGameLive,
  setMessage,
}) => {
  const diameter = settings.radius * 4;
  const j = settings.jiggliness * 4;

  const sketch = (s: P5CanvasInstance) => {
    let x: number;
    let y: number;
    setMessage("The circle wants clicks");
    s.setup = () => {
      s.createCanvas(canvasWidth, canvasHeight);
      x = s.random(0, s.width);
      y = s.random(s.height / 2, s.height / 3);
    };

    s.draw = () => {
      s.background(50, 89, 100);
      for (let i = 0; i < 6; i++) {
        s.ellipse(x, y, diameter, diameter);
        s.fill("#DB9D47");
        s.stroke(settings.colour1);
        // jiggling
        x = x + s.random(-j, j);
        y = y + s.random(-j, j);
        // lose condition
        if (y < 0) {
          setGameResult("lost");
          setGameLive(false);
          setMessage("");
        }
        // win condition
        if (y >= s.height) {
          setGameResult("won");
          setGameLive(false);
          setMessage("");
        }
        // in case it jiggles off screen x-axis:
        if (x > s.width) {
          x = 0;
        }
        x = x + 1;
        y = y - 1;
      }
    };

    s.mousePressed = () => {
      let d = s.dist(s.mouseX, s.mouseY, x, y);
      if (d < diameter) {
        y = y + 200;
      }
    };
  };

  return <ReactP5Wrapper sketch={sketch} />;
};

export default Level04;
