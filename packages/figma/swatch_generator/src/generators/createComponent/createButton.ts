import { TDSComponentVariant, createVariantFrames } from "./base";

import svg from "../../ui/assets/icon.svg?raw";
import tokens from "../../../../../../build/json/tokens.json";

import { bindTokensToHelpers } from "@common/utils";

const { setSize, setBorderColor, setBorderRadius, setBorderWidth, setColor, setFont, setGap, setPadding } =
  bindTokensToHelpers(tokens);

const createButton = (variant: TDSComponentVariant) => {
  const { type, color, interaction, size } = variant;

  // LEFT ICON
  const leftIcon = figma.createNodeFromSvg(svg);
  leftIcon.name = "left-icon";
  leftIcon.children.forEach((it) => {
    const f = it as FrameNode;

    setColor(f, `components.button.icon.fillColor.${type}.${color}`);
    setBorderColor(f, `components.button.icon.fillColor.${type}.${color}`);
  });
  setSize(leftIcon, [`components.button.icon.size.${size}`, `components.button.icon.size.${size}`]);

  // RIGHT ICON
  const rightIcon = leftIcon.clone();
  rightIcon.name = "right-icon";

  // TEXT
  const textNode = figma.createText();
  textNode.name = "label";
  textNode.characters = `Button`;
  setColor(textNode, `components.button.label.textColor.${type}.${color}`);
  setFont(textNode, `components.button.label.font.${size}`);

  // BUTTON
  const button = figma.createComponent();
  button.name = [`Type=${type}`, `Color=${color}`, `Interaction=${interaction}`, `Size=${size}`].join(", ");
  button.layoutMode = "HORIZONTAL";
  button.primaryAxisSizingMode = "AUTO";
  button.counterAxisSizingMode = "FIXED";
  button.counterAxisAlignItems = "CENTER";

  setColor(button, `components.button.container.fillColor.${type}.${color}.${interaction}`);
  setBorderColor(button, `components.button.container.borderColor.${type}.${color}`);
  setBorderWidth(button, `components.button.container.borderWidth.${size}`);
  setBorderRadius(button, `components.button.container.borderRadius.${size}`);
  setPadding(button, [`components.button.container.padding.${size}`, `components.button.container.padding.${size}`]);
  setGap(button, `components.button.container.gap.${size}`);
  setSize(button, [undefined, `components.button.container.height.${size}`]);

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
