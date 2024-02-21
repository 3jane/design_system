import { curryRight, get } from "lodash";

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

/** @deprecated Use setFont instead */
export function applyCssFontString(textNode: TextNode, cssFontString: string) {
  const { family, lineHeight, size, style } = cssFontToFigma(cssFontString);

  textNode.fontSize = size;
  textNode.fontName = { family, style };

  if (!isNaN(lineHeight)) {
    textNode.lineHeight = { value: lineHeight, unit: "PERCENT" };
  }
}

type Tokens = Record<string, any>;

export function setFont(element: TextNode, token: string, tokens: Tokens) {
  const cssFontString = get(tokens, token, "");
  const { family, lineHeight, size, style } = cssFontToFigma(cssFontString);

  element.setSharedPluginData("tokens", "typography", `"${token}"`);

  element.fontSize = size;
  element.fontName = { family, style };

  if (!isNaN(lineHeight)) {
    element.lineHeight = { value: lineHeight, unit: "PERCENT" };
  }
}

export function setSize(
  element: DefaultFrameMixin,
  [width, height]: [string | undefined, string | undefined],
  tokens: Tokens
) {
  const widthValue = width ? parseInt(get(tokens, width, element.width), 10) : element.width;
  const heightValue = height ? parseInt(get(tokens, height, element.height), 10) : element.height;

  element.setSharedPluginData("tokens", "width", `"${width}"`);
  element.setSharedPluginData("tokens", "height", `"${height}"`);
  element.resize(widthValue, heightValue);
}

export function setColor(element: DefaultShapeMixin, token: string, tokens: Tokens) {
  const color = get(tokens, token);

  element.setSharedPluginData("tokens", "fill", `"${token}"`);
  if (color) {
    element.fills = [figma.util.solidPaint(color)];
  }
}

export function setBorderColor(element: DefaultFrameMixin, token: string, tokens: Tokens) {
  const color = get(tokens, token);

  element.setSharedPluginData("tokens", "borderColor", `"${token}"`);
  if (color) {
    element.strokes = [figma.util.solidPaint(color)];
  }
}

export function setBorderWidth(element: DefaultFrameMixin, token: string, tokens: Tokens) {
  element.setSharedPluginData("tokens", "borderWidth", `"${token}"`);
  element.strokeWeight = parseInt(get(tokens, token, "0"), 10);
}

export function setBorderRadius(element: DefaultFrameMixin, token: string, tokens: Tokens) {
  element.setSharedPluginData("tokens", "borderRadius", `"${token}"`);
  element.cornerRadius = parseInt(get(tokens, token, "0"), 10);
}

export function setPadding(
  element: DefaultFrameMixin,
  [vertical, horizontal]: [string | undefined, string | undefined],
  tokens: Tokens
) {
  if (vertical) {
    const verticalPadding = parseInt(get(tokens, vertical, "0"), 10);

    element.setSharedPluginData("tokens", "verticalPadding", `"${vertical}"`);
    element.verticalPadding = verticalPadding;
  }

  if (horizontal) {
    const horizontalPadding = parseInt(get(tokens, horizontal, "0"), 10);

    element.setSharedPluginData("tokens", "horizontalPadding", `"${horizontal}"`);
    element.horizontalPadding = horizontalPadding;
  }
}

export function setGap(element: DefaultFrameMixin, token: string, tokens: Tokens) {
  element.setSharedPluginData("tokens", "itemSpacing", `"${token}"`);
  element.itemSpacing = parseInt(get(tokens, token, "0"), 10);
}

export function bindTokensToHelpers(tokens: Tokens) {
  return {
    setFont: curryRight(setFont)(tokens),
    setSize: curryRight(setSize)(tokens),
    setColor: curryRight(setColor)(tokens),
    setBorderColor: curryRight(setBorderColor)(tokens),
    setBorderWidth: curryRight(setBorderWidth)(tokens),
    setBorderRadius: curryRight(setBorderRadius)(tokens),
    setPadding: curryRight(setPadding)(tokens),
    setGap: curryRight(setGap)(tokens),
  };
}