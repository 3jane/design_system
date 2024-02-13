import { CreateComponentFn, TDSComponentTokens, TDSComponentVariant, createVariantFrames } from "./base";
import { JSON, JSONObject } from "@common/types/json";
import svg from "../../ui/assets/icon.svg?raw";
import get from "lodash/get";

import tokens from "../../../../../../build/json/tokens.json";

import { applyCssFontString, cssFontToFigma } from "@common/utils";

const createButton = (variant) => {
  const { type, color, interaction, size } = variant;

  // LEFT ICON
  const leftIcon = figma.createNodeFromSvg(svg);
  leftIcon.name = "left-icon";
  leftIcon.setSharedPluginData("tokens", "width", `"components.button.icon.size.${size}"`);
  leftIcon.setSharedPluginData("tokens", "height", `"components.button.icon.size.${size}"`);
  leftIcon.children.forEach((it) => {
    const f = it as FrameNode;

    f.setSharedPluginData("tokens", "fill", `"components.button.icon.fillColor.${type}.${color}"`);
    f.setSharedPluginData("tokens", "border", `"components.button.icon.fillColor.${type}.${color}"`);

    const fillColor = get(tokens, `components.button.icon.fillColor.${type}.${color}`);
    if (fillColor) {
      f.fills = [figma.util.solidPaint(fillColor)];
    }
    const strokeColor = get(tokens, `components.button.icon.fillColor.${type}.${color}`);
    if (strokeColor) {
      f.strokes = [figma.util.solidPaint(strokeColor)];
    }
  });

  leftIcon.resize(
    parseInt(get(tokens, `components.button.icon.size.${size}`, String(leftIcon.height)), 10),
    parseInt(get(tokens, `components.button.icon.size.${size}`, String(leftIcon.height)), 10)
  );

  // RIGHT ICON
  const rightIcon = leftIcon.clone();
  rightIcon.name = "right-icon";

  // TEXT
  const textNode = figma.createText();
  textNode.name = "label";
  textNode.setSharedPluginData("tokens", "fill", `"components.button.label.textColor.${type}.${color}"`);
  textNode.setSharedPluginData("tokens", "typography", `"components.button.label.font.${size}"`);
  textNode.characters = `Button`;

  applyCssFontString(textNode, get(tokens, `components.button.label.font.${size}`, ""));
  const textColor = get(tokens, `components.button.label.textColor.${type}.${color}`);
  if (textColor) {
    textNode.fills = [figma.util.solidPaint(textColor)];
  }

  // BUTTON
  const button = figma.createComponent();
  button.name = [`Type=${type}`, `Color=${color}`, `Interaction=${interaction}`, `Size=${size}`].join(", ");
  button.layoutMode = "HORIZONTAL";
  button.primaryAxisSizingMode = "AUTO";
  button.counterAxisSizingMode = "FIXED";
  button.counterAxisAlignItems = "CENTER";

  // CONNECT TO FT
  button.setSharedPluginData(
    "tokens",
    "fill",
    `"components.button.container.fillColor.${type}.${color}.${interaction}"`
  );
  button.setSharedPluginData("tokens", "border", `"components.button.container.borderColor.${type}.${color}"`);
  button.setSharedPluginData("tokens", "itemSpacing", `"components.button.container.gap.${size}"`);
  button.setSharedPluginData("tokens", "height", `"components.button.container.height.${size}"`);
  button.setSharedPluginData("tokens", "verticalPadding", `"components.button.container.padding.${size}"`);
  button.setSharedPluginData("tokens", "horizontalPadding", `"components.button.container.padding.${size}"`);
  button.setSharedPluginData("tokens", "borderRadius", `"components.button.container.borderRadius.${size}"`);
  button.setSharedPluginData("tokens", "borderWidth", `"components.button.container.borderWidth.${size}"`);

  // SET DEFAULT VALUE
  button.itemSpacing = parseInt(get(tokens, `components.button.container.gap.${size}`, "0"), 10);
  button.verticalPadding = parseInt(get(tokens, `components.button.container.padding.${size}`, "0"), 10);
  button.horizontalPadding = parseInt(get(tokens, `components.button.container.padding.${size}`, "0"), 10);
  button.cornerRadius = parseInt(get(tokens, `components.button.container.borderRadius.${size}`, "0"), 10);
  button.strokeWeight = parseInt(get(tokens, `components.button.container.borderWidth.${size}`, "0"), 10);
  button.resize(
    button.width,
    parseInt(get(tokens, `components.button.container.height.${size}`, String(button.height)), 10)
  );

  const backgroundColor = get(tokens, `components.button.container.fillColor.${type}.${color}.${interaction}`);
  if (backgroundColor) {
    button.fills = [figma.util.solidPaint(backgroundColor)];
  }
  const borderColor = get(tokens, `components.button.container.borderColor.${type}.${color}`);
  if (borderColor) {
    button.strokes = [figma.util.solidPaint(borderColor)];
  }

  button.appendChild(leftIcon);
  button.appendChild(textNode);
  button.appendChild(rightIcon);

  return button;
};

const createButtonSwatch = (tokens: {}) => {
  return createVariantFrames("Button", createButton, [
    { name: "type", values: ["elevated", "filled", "tonal", "outlined", "text"] },
    {
      name: "color",
      values: ["primary", "secondary", "neutral", "success", "error", "warning", "info", "digital", "disabled"],
    },
    { name: "size", values: ["small", "medium", "large"] },
    { name: "interaction", values: ["enabled", "hovered", "interacted", "focused"] },
  ]);
};

export { createButtonSwatch, createButton };
