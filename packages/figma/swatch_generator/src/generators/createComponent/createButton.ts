import { CreateComponentFn, TDSComponentTokens, TDSComponentVariant, createVariantFrames } from "./base";
import { JSON, JSONObject } from "@common/types/json";
import svg from "../../ui/assets/icon.svg?raw";
import get from "lodash/get";

import tokens from "../../../../../../build/json/tokens.json";

import { cssFontToFigma } from "@common/utils";

async function applyCssFontString(textNode: TextNode, cssFontString: string) {
  const { family, lineHeight, size, style } = cssFontToFigma(cssFontString);

  textNode.fontSize = size;
  textNode.fontName = { family, style };

  if (!isNaN(lineHeight)) {
    textNode.lineHeight = { value: lineHeight, unit: "PERCENT" };
  }
}

class TDSButtonVariant extends TDSComponentVariant {
  constructor(public type: string, public color: string, public interaction: string, public size: string) {
    super();
  }

  static fromJSON(json: any): TDSButtonVariant {
    // Validate specific to TDSButtonVariant structure
    if (!json || typeof json !== "object" || !json.type || !json.color || !json.interaction || !json.size) {
      console.log(json);
      throw new Error("Invalid JSON data for TDSButtonVariant");
    }

    const instance = new TDSButtonVariant(json.type, json.color, json.interaction, json.size);
    Object.assign(instance, json);
    // Here, you can add more specific validations for ButtonTokens

    return instance;
  }
}

class TDSButtonTokens extends TDSComponentTokens {
  [key: string]: JSON;

  constructor(public container: JSONObject, public icon: JSONObject, public label: JSONObject) {
    super();
  }

  static fromJSON(json: any): TDSButtonTokens {
    // Validate specific to ButtonTokens structure
    if (!json || typeof json !== "object" || !json.container || !json.icon || !json.label) {
      console.log(json);
      throw new Error("Invalid JSON data for ButtonTokens");
    }

    const instance = new TDSButtonTokens(json.container, json.icon, json.label);
    Object.assign(instance, json);
    // Here, you can add more specific validations for ButtonTokens

    return instance;
  }
}

interface CreateButtonFn extends CreateComponentFn {
  (tokens: TDSButtonTokens, variant: TDSButtonVariant): FrameNode | ComponentNode;
}

const createButton: CreateButtonFn = (variant) => {
  const { type, color, interaction, size }: TDSButtonVariant = TDSButtonVariant.fromJSON(variant);
  const defaultValue = tokens.components.button;

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
    parseInt(get(defaultValue, `icon.size.${size}`, String(leftIcon.height)), 10),
    parseInt(get(defaultValue, `icon.size.${size}`, String(leftIcon.height)), 10)
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

  applyCssFontString(textNode, get(defaultValue, `label.font.${size}`, ""));
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
