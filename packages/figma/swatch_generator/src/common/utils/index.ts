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

function cssBoxShadowToFigma(value: string): DropShadowEffect | InnerShadowEffect | undefined {
  const isInset = value.includes("inset");
  const normalizedString = value.replace("inset", "").trim();
  const regex =
    /(-?\d*\.?\d+)(px)?\s(-?\d*\.?\d+)(px)?\s(\d*\.?\d+)(px)?(\s(\d*\.?\d+)(px)?)?\s(rgba?\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*((\d*\.?\d+)(%?))\))/;
  const match = normalizedString.match(regex);

  console.log("🚧 ~ cssBoxShadowToFigma ~ value:", value);
  if (!match) {
    console.error("Invalid box shadow string");
    return;
  }

  const xOffset = parseFloat(match[1]);
  const yOffset = parseFloat(match[3]);
  const blurRadius = parseFloat(match[5]);
  // Figma unsupported spread radius
  const spreadRadius = match[7] ? parseFloat(match[8]) : 0;
  const colorPart = match[10].match(/[\d.]+/g);

  if (!colorPart) {
    console.error("Invalid box shadow color");
    return;
  }

  const alpha = parseFloat(colorPart[3]);
  const color = {
    r: parseInt(colorPart[0]) / 255,
    g: parseInt(colorPart[1]) / 255,
    b: parseInt(colorPart[2]) / 255,
    a: alpha > 1 ? alpha / 100 : alpha,
  };

  return {
    type: isInset ? "INNER_SHADOW" : "DROP_SHADOW",
    color: color,
    offset: {
      x: xOffset,
      y: yOffset,
    },
    radius: blurRadius,
    spread: spreadRadius,
    visible: true,
    blendMode: "NORMAL",
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
  element.textAlignVertical = "CENTER";
  element.resize(element.width, size);

  if (!isNaN(lineHeight)) {
    element.lineHeight = { value: lineHeight, unit: "PERCENT" };
  }
}

export function setShadow(element: DefaultFrameMixin, token: string, tokens: Tokens) {
  const cssShadowString = get(tokens, token, "");
  const shadowEffect = cssBoxShadowToFigma(cssShadowString);

  element.setSharedPluginData("tokens", "boxShadow", `"${token}"`);
  if (shadowEffect) {
    element.effects = [shadowEffect];
  }
}

export function setSize(
  element: DefaultFrameMixin,
  [width, height]: [string | undefined, string | undefined],
  tokens: Tokens
) {
  const widthValue = width ? parseInt(get(tokens, width, element.width), 10) : element.width;
  const heightValue = height ? parseInt(get(tokens, height, element.height), 10) : element.height;

  if (width) {
    element.setSharedPluginData("tokens", "width", `"${width}"`);
  }
  if (height) {
    element.setSharedPluginData("tokens", "height", `"${height}"`);
  }
  element.resize(widthValue, heightValue);
}

export function setColor(element: DefaultShapeMixin, token: string, tokens: Tokens) {
  const color = get(tokens, token, "rgba(0,0,0,0)");

  element.setSharedPluginData("tokens", "fill", `"${token}"`);
  if (color) {
    element.fills = [figma.util.solidPaint(color)];
  }
}

export function setBorderColor(element: DefaultShapeMixin, token: string, tokens: Tokens) {
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

export function setPadding(element: DefaultFrameMixin, paddings: (string | undefined)[], tokens: Tokens): void {
  let top, right, bottom, left;

  if (paddings.length === 2) {
    top = bottom = paddings[0];
    right = left = paddings[1];
  } else {
    top = paddings[0];
    right = paddings[1];
    bottom = paddings[2];
    left = paddings[3];
  }

  if (top) {
    const value = parseInt(get(tokens, top, "0"), 10);

    element.setSharedPluginData("tokens", "paddingTop", `"${top}"`);
    element.paddingTop = value;
  }

  if (right) {
    const value = parseInt(get(tokens, right, "0"), 10);

    element.setSharedPluginData("tokens", "paddingRight", `"${right}"`);
    element.paddingRight = value;
  }

  if (bottom) {
    const value = parseInt(get(tokens, bottom, "0"), 10);

    element.setSharedPluginData("tokens", "paddingBottom", `"${bottom}"`);
    element.paddingBottom = value;
  }

  if (left) {
    const value = parseInt(get(tokens, left, "0"), 10);

    element.setSharedPluginData("tokens", "paddingLeft", `"${left}"`);
    element.paddingLeft = value;
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
    setShadow: curryRight(setShadow)(tokens),
  };
}

export function traverse(node: SceneNode, typesToFind: SceneNode["type"][], cb: (node: SceneNode) => void) {
  if (typesToFind.includes(node.type)) {
    cb(node);
  }

  if ("children" in node) {
    for (const child of node.children) {
      traverse(child, typesToFind, cb);
    }
  }
}
