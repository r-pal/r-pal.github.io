import { useState } from "react";
import { P5CanvasInstance, ReactP5Wrapper } from "react-p5-wrapper";
import { canvasHeight, canvasWidth } from "../constants/canvas";
import { Settings } from "./Settings";

type Level02Props = {
  settings: Settings;
  setGameResult: (value: "won" | "lost" | undefined) => void;
  setGameLive: (value: boolean) => void;
};

const Level02: React.FC<Level02Props> = ({
  settings,
  setGameResult,
  setGameLive,
}) => {
  const r = settings.radius;
  const d = settings.radius * 2;
  const j = settings.jiggliness;
  const [fill, setFill] = useState(settings.colour2);
  const [stroke, setStroke] = useState(settings.colour1);
  const [yGatesEntered, setYGatesEntered] = useState(false);
  const [xGatesEntered, setXGatesEntered] = useState(false);

  const sketch = (s: P5CanvasInstance) => {
    let x: number;
    let y: number;
    const xGatesEntered: number[] = [];
    const yGatesEntered: number[] = [];
    let colour1 = settings.colour1;
    let colour2 = settings.colour2;

    s.setup = () => {
      s.createCanvas(canvasWidth, canvasHeight);
      x = Math.round(s.random(0, s.width));
      y = Math.round(s.random(0, s.height));
    };

    s.windowResized = () => {
      s.resizeCanvas(s.windowWidth, s.windowHeight);
    };

    s.draw = () => {
      // without s.background() the circle produces chemtrails
      const gateNumber = Math.ceil(s.height / d);
      const gates = Array.from({ length: gateNumber }, (_, i) => ({
        start: i === 0 ? 0 : i * r + 1,
        end: (i + 1) * r,
      }));

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
          // make array of object gates where an object == (start, end) and where the length === gateNumber
          // iterate through gates array
          // if y value falls between value a and value b in an object of the gates array
          // then add to set of gatesEntered
          // when gatesEntered === gates.length, game won
          const gate = gates.find((gate) => y >= gate.start && y <= gate.end);
          const gateIndex = gate ? gates.indexOf(gate) : -1;
          yGatesEntered.push(gateIndex);
          const uniqueGatesEntered: number[] = Array.from(
            new Set(yGatesEntered)
          );
          console.log(`Count of Ygates entered: ${uniqueGatesEntered}`);
          if (uniqueGatesEntered.length === gates.length) {
            setYGatesEntered(true);
            if (xGatesEntered) {
              setGameResult("won");
              setGameLive(false);
            }
          }
        }
        //exit bottom (x-gates)
        if (y > s.height) {
          y = 0;
          const gate = gates.find((gate) => x >= gate.start && x <= gate.end);
          const gateIndex = gate ? gates.indexOf(gate) : -1;
          xGatesEntered.push(gateIndex);
          const uniqueGatesEntered: number[] = Array.from(
            new Set(xGatesEntered)
          );
          console.log(`Count of Xgates entered: ${uniqueGatesEntered}`);
          if (uniqueGatesEntered.length === gates.length) {
            setXGatesEntered(true);
            if (xGatesEntered) {
              setGameResult("won");
              setGameLive(false);
            }
          }
        }
        // movement across canvas
        y = y + 1;
        x = x - 1;
      }
    };

    s.mousePressed = () => {
      let distance = s.dist(s.mouseX, s.mouseY, x, y);
      if (distance < d) {
        if (fill === colour1) {
          setFill(colour2);
          setStroke(colour1);
        }
        if (fill === colour2) {
          setFill(colour1);
          setStroke(colour2);
        }
      }
    };
  };

  return <ReactP5Wrapper sketch={sketch} />;
};

export default Level02;
