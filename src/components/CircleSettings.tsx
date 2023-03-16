import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { colours, Colour } from "../constants/colours";
import clsx from "clsx";
import { textColour } from "./utils/textColour";

export type Inputs = {
  radius: number;
  instances: number;
  colour1: string;
  colour2: string;
  jiggliness: number;
};

type CircleSettingsProps = {
  setCircleSketch: (value: Inputs) => void;
};

const CircleSettings: React.FC<CircleSettingsProps> = ({ setCircleSketch }) => {
  const [selectedColourHex, setSelectedColourHex] = useState("#EDFFD9");
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    data.colour2 = textColour(selectedColourHex);
    setCircleSketch(data);
  };

  return (
    <div>
      <form id="settings" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex flex-col items-left gap-3">
          <div>
            Size
            <input
              type="range"
              step="50"
              min="10"
              max="1010"
              className="range range-md border-[#EDFFD9]"
              id="size"
              defaultValue={50}
              {...register("radius")}
            />
          </div>
          <div className="flex-col">
            <div>Colour</div>
            <select
              {...register("colour1")}
              className={clsx(
                `selectedColourHex && bg-[${selectedColourHex}] text-[${textColour(
                  selectedColourHex
                )}]`
              )}
              onChange={(e) => setSelectedColourHex(e.target.value)}
              value={selectedColourHex}
            >
              {colours.map((c) => (
                <option
                  key={c.hex}
                  value={c.hex}
                  className={clsx(`bg-[${c.hex}] text-[${c.text}]`)}
                >
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            Jiggly Factor
            <input
              type="range"
              step="1"
              min="1"
              max="10"
              defaultValue={1}
              className="range range-md"
              id="jiggliness"
              {...register("jiggliness")}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CircleSettings;
