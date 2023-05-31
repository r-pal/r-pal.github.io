import { useCallback, useEffect } from "react";
import { P5CanvasInstance, ReactP5Wrapper } from "react-p5-wrapper";
import { canvasHeight, canvasWidth } from "../constants/canvas";
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
  const r = settings.radius;

  useEffect(() => {
    setMessage("Large screen = large wait");
  }, []);

  const sketch = useCallback(
    (s: P5CanvasInstance) => {
      let x: number;
      let y: number;
      let angle = 0;
      let spiralRadius = 0;

      const blockSize = 10;
      const visitedPixels = Array(Math.ceil(canvasWidth / blockSize))
        .fill(false)
        .map(() => Array(Math.ceil(canvasHeight / blockSize)).fill(false));

      s.setup = () => {
        s.createCanvas(canvasWidth, canvasHeight);
        // Initialize the circle at the center of the canvas
        x = s.width / 2;
        y = s.height / 2;
      };

      s.windowResized = () => {
        s.resizeCanvas(s.windowWidth, s.windowHeight);
      };

      s.draw = () => {
        s.ellipse(x, y, r * 2, r * 2);
        s.fill(settings.colour1);
        s.stroke(settings.colour2);

        angle += 0.1;

        if (x <= 0 || x >= canvasWidth || y <= 0 || y >= canvasHeight) {
          spiralRadius -= 0.5;
          if (spiralRadius <= 0) {
            spiralRadius = 0;
          }
        } else {
          spiralRadius += 0.5;
        }

        x = s.width / 2 + spiralRadius * Math.cos(angle);
        y = s.height / 2 + spiralRadius * Math.sin(angle);

        // ensure x and y are within the canvas bounds
        x = Math.min(Math.max(x, 0), canvasWidth - 1);
        y = Math.min(Math.max(y, 0), canvasHeight - 1);

        // Iterate over the circle's area.
        for (let i = -r; i <= r; i++) {
          for (let j = -r; j <= r; j++) {
            const pixelX = Math.round(x) + i;
            const pixelY = Math.round(y) + j;

            // Check if the pixel is within the circle and the canvas.
            if (
              i * i + j * j <= r * r &&
              pixelX >= 0 &&
              pixelX < canvasWidth &&
              pixelY >= 0 &&
              pixelY < canvasHeight
            ) {
              // Mark the pixel as visited.
              visitedPixels[Math.floor(pixelX / blockSize)][
                Math.floor(pixelY / blockSize)
              ] = true;
            }
          }
        }

        // Check if all pixels have been visited.
        const allVisited = visitedPixels.every((row) => row.every(Boolean));

        if (allVisited) {
          setGameResult("won");
          setGameLive(false);
          setMessage("");
        }
      };
    },
    [settings, setGameResult, setGameLive, setMessage]
  );

  return <ReactP5Wrapper sketch={sketch} />;
};

export default Level04;
