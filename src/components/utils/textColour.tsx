import { colours } from "../../constants/colours";

export const textColour = (selectedColourHex: string) => {
  for (const c of colours) {
    if (c.hex === selectedColourHex) return c.text;
  }
  return "";
};
