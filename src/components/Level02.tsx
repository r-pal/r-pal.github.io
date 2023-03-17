import { useEffect, useState } from "react";
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
  const diameter = settings.radius * 2;
  const j = settings.jiggliness;

  //calculate sum of all x-pixels and y-pixels
  const xSum = (canvasWidth * (canvasWidth + 1)) / 2;
  const ySum = (canvasHeight * (canvasHeight + 1)) / 2;
  console.log(xSum * ySum);

  const sketch = (s: P5CanvasInstance) => {
    let x: number;
    let y: number;
    let pixelCount: number;
    // let xVisited: number[] = [];

    s.setup = () => {
      s.createCanvas(canvasWidth, canvasHeight);
      x = s.random(0, s.width);
      y = s.random(s.height / 2, s.height / 3);
      pixelCount = (x + y) * diameter;
    };

    s.windowResized = () => {
      s.resizeCanvas(s.windowWidth, s.windowHeight);
      // s.drawBackground();
      // s.setupPosition();
    };

    s.draw = () => {
      // s.background(50, 89, 100);

      for (let i = 0; i < 6; i++) {
        s.ellipse(x, y, diameter, diameter);
        s.fill(settings.colour1);
        s.stroke(settings.colour2);
        // jiggling
        x = x + s.random(-j, j);
        y = y + s.random(-j, j);
        // in case it jiggles off screen both axes:
        if (x < 0) {
          x = s.width;
        }
        if (x > s.width) {
          x = 0;
        }
        if (y < 0) {
          y = s.height;
        }
        if (y > s.height) {
          y = 0;
        }
        //
        y = y + 1;
        x = x - 1;
        pixelCount = pixelCount + (x * diameter + y * diameter);
        console.log(pixelCount);
        if (pixelCount > xSum * ySum) {
          setGameResult("won");
          setGameLive(false);
        }
      }
    };

    // s.count = () => {
    //   const circleX
    // }

    s.mousePressed = () => {
      let d = s.dist(s.mouseX, s.mouseY, x, y);
      if (d < diameter) {
        y = y + 100;
      }
    };
  };

  return <ReactP5Wrapper sketch={sketch} />;
};

export default Level02;
