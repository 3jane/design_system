const fontWeightMap: Record<string, string> = {
  100: "Thin",
  200: "Extra Light",
  300: "Light",
  400: "Regular",
  500: "Medium",
  600: "Semi Bold",
  700: "Bold",
  800: "Extra Bold",
  900: "Black",
  950: "Extra Black",
};

export function cssFontToFigma(value: string) {
  const parts = value.split(" "); // "600 14px/1.25 Inter"

  const fontWeight = parts[0];
  const fontSizeAndLineHeight = parts[1].split("/");
  const fontSize = parseFloat(fontSizeAndLineHeight[0]);
  const lineHeight = parseFloat(fontSizeAndLineHeight[1]);
  const fontFamily = parts.slice(2).join(" ");

  return {
    family: fontFamily,
    style: fontWeightMap[fontWeight],
    size: fontSize,
    lineHeight: lineHeight,
  };
}

export function applyCssFontString(textNode: TextNode, cssFontString: string) {
  const { family, lineHeight, size, style } = cssFontToFigma(cssFontString);

  textNode.fontSize = size;
  textNode.fontName = { family, style };

  if (!isNaN(lineHeight)) {
    textNode.lineHeight = { value: lineHeight, unit: "PERCENT" };
  }
}
