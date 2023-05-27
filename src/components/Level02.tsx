import { useCallback } from "react";
import { P5CanvasInstance, ReactP5Wrapper } from "react-p5-wrapper";
import { canvasWidth, canvasHeight } from "../constants/canvas";
import { Settings } from "./CircleSettings";

type Level02Props = {
  settings: Settings;
  setGameResult: (value: "won" | "lost" | undefined) => void;
  setGameLive: (value: boolean) => void;
  setMessage: (value: string) => void;
};

const Level02: React.FC<Level02Props> = ({
  settings,
  setGameResult,
  setGameLive,
  setMessage,
}) => {
  let diameter = settings.radius * 2;

  const sketch = useCallback(
    (s: P5CanvasInstance) => {
      let x: number;
      let y: number;
      const isCursorInsideCircle = () => {
        let d = s.dist(s.mouseX, s.mouseY, x, y);
        return d < diameter / 2;
      };

      setMessage("The circle wants clicks");
      s.setup = () => {
        s.createCanvas(canvasWidth, canvasHeight);
        x = s.random(0, s.width);
        y = s.random(s.height / 2, s.height / 3);
      };

      s.draw = () => {
        s.background(50, 89, 100);
        for (let i = 0; i < 6; i++) {
          x = s.random(0, s.width);
          y = s.random(s.height / 2, s.height / 3);
          s.ellipse(x, y, diameter, diameter);
          s.fill(settings.colour1);
          s.stroke(settings.colour2);
          // lose condition
          if (diameter > s.height) {
            setGameResult("lost");
            setGameLive(false);
            setMessage("");
          }
          // win condition
          if (diameter < 25) {
            setGameResult("won");
            setGameLive(false);
            setMessage("");
          }
          // in case it jiggles off screen x-axis:
          if (x < 0) {
            x = s.width;
          }
          if (y < 0) {
            y = s.height;
          }
          diameter = diameter + 0.1;
          if (isCursorInsideCircle()) {
            s.cursor("pointer");
          } else {
            s.cursor("default");
          }
        }
      };

      s.half_speed = () => {
        s.speed(0.5);
      };

      s.mousePressed = () => {
        let d = s.dist(s.mouseX, s.mouseY, x, y);
        if (d < diameter) {
          diameter = diameter - 75;
        }
      };
    },
    [settings, setGameResult, setGameLive, setMessage, diameter]
  );

  return <ReactP5Wrapper sketch={sketch} />;
};

export default Level02;
