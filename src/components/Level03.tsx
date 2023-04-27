import { useCallback, useEffect, useState } from "react";
import { P5CanvasInstance, ReactP5Wrapper } from "react-p5-wrapper";
import { canvasHeight, canvasWidth } from "../constants/canvas";
import { Settings } from "./CircleSettings";

type Level03Props = {
  settings: Settings;
  setGameResult: (value: "won" | "lost" | undefined) => void;
  setGameLive: (value: boolean) => void;
  setMessage: (value: string) => void;
};

const Level03: React.FC<Level03Props> = ({
  settings,
  setGameResult,
  setGameLive,
  setMessage,
}) => {
  const d = settings.radius * 2;
  const j = settings.jiggliness;
  const [fill, setFill] = useState(settings.colour2);
  const [stroke, setStroke] = useState(settings.colour1);
  useEffect(() => {
    setMessage("Hit that line");
  }, []);

  const sketch = useCallback(
    (s: P5CanvasInstance) => {
      let x: number;
      let y: number;

      s.setup = () => {
        s.createCanvas(canvasWidth, canvasHeight);
        x = Math.round(s.random(0, s.width));
        y = Math.round(s.random(0, s.height));
      };

      s.windowResized = () => {
        s.resizeCanvas(s.windowWidth, s.windowHeight);
      };

      s.draw = () => {
        let rectX = 50;
        let rectY = 50;
        s.rect(rectX, rectY, 5, d * 2);
        s.fill(stroke);
        // without s.background() the circle produces chemtrails
        for (let i = 0; i < 6; i++) {
          s.ellipse(x, y, d, d);
          s.fill(fill);
          s.stroke(stroke);
          // jiggling
          x = x + s.random(-j, j);
          y = y + s.random(-j, j);
          //(0,0) is coordinates for top left corner
          //(s.width, s.height) for bottom right
          //enter right
          if (x > s.width) {
            x = 0;
          }
          //enter top
          if (y <= 0) {
            y = s.height;
          }
          // exit left (y-gates)
          if (x <= 0) {
            x = s.width;
          }
          //exit bottom (x-gates)
          if (y > s.height) {
            y = 0;
          }
          // movement across canvas
          // y = y + 1;
          x = x - 1;
        }
        // lose condition
        // if (d > s.height) {
        //   setGameResult("lost");
        //   setGameLive(false);
        //   setMessage("");
        // }
        // win condition
        if (y >= 50 - d && y <= 50 + d) {
          setGameResult("won");
          setGameLive(false);
          setMessage("");
        }
        console.log(y);
      };

      s.mousePressed = () => {
        let distance = s.dist(s.mouseX, s.mouseY, x, y);
        if (distance < d) {
          y = y + 300;
        }
      };
    },
    [settings, setGameResult, setGameLive, setMessage]
  );

  return <ReactP5Wrapper sketch={sketch} />;
};

export default Level03;
