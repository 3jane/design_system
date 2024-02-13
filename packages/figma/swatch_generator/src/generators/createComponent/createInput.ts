import { TDSComponentVariant, createVariantFrames } from "./base";

import svg from "../../ui/assets/icon.svg?raw";
import get from "lodash/get";

import tokens from "../../../../../../build/json/tokens.json";

import { applyCssFontString } from "@common/utils";

const transparent = "rgba(0,0,0,0)";
const WIDTH = 349;

const createInput = (variant: TDSComponentVariant) => {
  const { type, interaction, size, state, leadingIcon, trailingIcon } = variant;

  /* LABEL */
  const label = figma.createText();
  label.name = "label";
  label.characters = `Label`;
  applyCssFontString(label, get(tokens, `components.input.inputText.font.${size}`, ""));
  label.setSharedPluginData("tokens", "typography", `"components.input.inputText.font.${size}"`);

  const labelContainer = figma.createFrame();
  labelContainer.name = "label";
  labelContainer.layoutMode = "HORIZONTAL";
  labelContainer.counterAxisAlignItems = "CENTER";
  labelContainer.itemSpacing = parseInt(get(tokens, `components.input.titleLabel.container.gap.${size}`, "0"), 10);
  labelContainer.setSharedPluginData("tokens", "itemSpacing", `"components.input.titleLabel.container.gap.${size}"`);
  labelContainer.horizontalPadding = parseInt(
    get(tokens, `components.input.titleLabel.container.padding.${size}`, "0"),
    10
  );
  labelContainer.setSharedPluginData(
    "tokens",
    "horizontalPadding",
    `"components.input.titleLabel.container.padding.${size}"`
  );
  labelContainer.fills = [figma.util.solidPaint(transparent)];
  labelContainer.resize(
    labelContainer.width,
    parseInt(get(tokens, `components.input.titleLabel.container.height.${size}`, String(labelContainer.height)), 10)
  );
  labelContainer.setSharedPluginData("tokens", "height", `"components.input.titleLabel.container.height.${size}"`);
  labelContainer.appendChild(label);

  /* HINT */
  const hint = figma.createText();
  hint.name = "hint";
  hint.characters = `Hint`;
  applyCssFontString(hint, get(tokens, `components.input.inputText.font.${size}`, ""));
  label.setSharedPluginData("tokens", "typography", `"components.input.inputText.font.${size}"`);

  const hintContainer = figma.createFrame();
  hintContainer.name = "hint";
  hintContainer.layoutMode = "HORIZONTAL";
  hintContainer.counterAxisAlignItems = "CENTER";
  hintContainer.itemSpacing = parseInt(get(tokens, `components.input.hintLabel.container.gap.${size}`, "0"), 10);
  hintContainer.setSharedPluginData("tokens", "itemSpacing", `"components.input.hintLabel.container.gap.${size}"`);
  hintContainer.horizontalPadding = parseInt(
    get(tokens, `components.input.hintLabel.container.padding.${size}`, "0"),
    10
  );
  hintContainer.setSharedPluginData(
    "tokens",
    "horizontalPadding",
    `"components.input.hintLabel.container.padding.${size}"`
  );
  hintContainer.fills = [figma.util.solidPaint(transparent)];
  hintContainer.resize(
    hintContainer.width,
    parseInt(get(tokens, `components.input.hintLabel.container.height.${size}`, String(hintContainer.height)), 10)
  );
  hintContainer.setSharedPluginData("tokens", "height", `"components.input.hintLabel.container.height.${size}"`);
  hintContainer.appendChild(hint);

  /* PLACEHOLDER */
  const placeholder = figma.createText();
  placeholder.characters = `Placeholder`;
  applyCssFontString(placeholder, get(tokens, `components.input.inputText.font.${size}`, ""));
  label.setSharedPluginData("tokens", "typography", `"components.input.inputText.font.${size}"`);
  placeholder.fills = [
    figma.util.solidPaint(get(tokens, `components.input.inputText.textColor.${type}.placeholder`, "")),
  ];
  placeholder.setSharedPluginData("tokens", "fill", `"components.input.inputText.textColor.${type}.placeholder"`);

  const placeholderContainer = figma.createFrame();
  placeholderContainer.name = "placeholder";
  placeholderContainer.fills = [figma.util.solidPaint(transparent)];
  placeholderContainer.layoutMode = "HORIZONTAL";
  placeholderContainer.primaryAxisSizingMode = "AUTO";
  placeholderContainer.counterAxisSizingMode = "AUTO";
  placeholderContainer.counterAxisAlignItems = "CENTER";
  placeholderContainer.primaryAxisAlignItems = "MIN";

  /* INPUT */
  const container = figma.createFrame();
  container.name = "container";
  container.itemSpacing = parseInt(get(tokens, `components.input.container.gap.${size}`, "0"), 10);
  container.setSharedPluginData("tokens", "itemSpacing", `"components.input.container.gap.${size}"`);
  container.horizontalPadding = parseInt(get(tokens, `components.input.container.padding.${size}`, "0"), 10);
  container.setSharedPluginData("tokens", "horizontalPadding", `"components.input.container.padding.${size}"`);
  container.cornerRadius = parseInt(get(tokens, `components.input.container.borderRadius.${size}.${type}`, "0"), 10);
  container.setSharedPluginData("tokens", "borderRadius", `"components.input.container.borderRadius.${size}.${type}"`);
  container.strokeWeight = parseInt(
    get(tokens, `components.input.container.borderWidth.${type}.${interaction}`, "0"),
    10
  );
  container.setSharedPluginData(
    "tokens",
    "borderWidth",
    `"components.input.container.borderWidth.${type}.${interaction}"`
  );
  container.strokes = [
    figma.util.solidPaint(
      get(tokens, `components.input.container.borderColor.${type}.${state}.${interaction}`, transparent)
    ),
  ];
  container.setSharedPluginData(
    "tokens",
    "borderColor",
    `"components.input.container.borderColor.${type}.${state}.${interaction}"`
  );
  container.fills = [
    figma.util.solidPaint(get(tokens, `components.input.container.fillColor.${type}.${interaction}`, transparent)),
  ];
  container.setSharedPluginData("tokens", "fill", `"components.input.container.fillColor.${type}.${interaction}"`);
  container.resize(
    WIDTH,
    parseInt(get(tokens, `components.input.container.height.${size}`, String(container.height)), 10)
  );
  container.setSharedPluginData("tokens", "height", `"components.input.container.height.${size}"`);
  container.setSharedPluginData("tokens", "boxShadow", `"components.input.container.shadow.${type}.${interaction}"`);
  container.layoutMode = "HORIZONTAL";
  container.primaryAxisSizingMode = "FIXED";
  container.counterAxisSizingMode = "FIXED";
  container.counterAxisAlignItems = "CENTER";
  container.primaryAxisAlignItems = "SPACE_BETWEEN";

  if (leadingIcon === "true") {
    const leftIcon = figma.createNodeFromSvg(svg);
    leftIcon.name = "left-icon";
    leftIcon.children.forEach((it) => {
      const f = it as FrameNode;

      f.fills = [figma.util.solidPaint(get(tokens, `components.input.leadingIcon1.color.${type}`, transparent))];
      f.strokes = [figma.util.solidPaint(get(tokens, `components.input.leadingIcon1.color.${type}`, transparent))];
      f.setSharedPluginData("tokens", "fill", `"components.input.leadingIcon1.color.${type}"`);
      f.setSharedPluginData("tokens", "border", `"components.input.leadingIcon1.color.${type}"`);
    });

    leftIcon.resize(
      parseInt(get(tokens, `components.input.leadingIcon1.size.${size}`, String(leftIcon.height)), 10),
      parseInt(get(tokens, `components.input.leadingIcon1.size.${size}`, String(leftIcon.height)), 10)
    );
    leftIcon.setSharedPluginData("tokens", "width", `"components.input.leadingIcon1.size.${size}"`);
    leftIcon.setSharedPluginData("tokens", "height", `"components.input.leadingIcon1.size.${size}"`);
    container.appendChild(leftIcon);
  }

  container.appendChild(placeholderContainer);
  placeholderContainer.layoutSizingHorizontal = "FILL";
  placeholderContainer.layoutSizingVertical = "FILL";
  placeholderContainer.appendChild(placeholder);

  if (trailingIcon === "true") {
    const rightIcon = figma.createNodeFromSvg(svg);
    rightIcon.name = "left-icon";
    rightIcon.children.forEach((it) => {
      const f = it as FrameNode;

      f.fills = [figma.util.solidPaint(get(tokens, `components.input.trailingIcon1.color.${type}`, transparent))];
      f.strokes = [figma.util.solidPaint(get(tokens, `components.input.trailingIcon1.color.${type}`, transparent))];
      f.setSharedPluginData("tokens", "fill", `"components.input.trailingIcon1.color.${type}"`);
      f.setSharedPluginData("tokens", "border", `"components.input.trailingIcon1.color.${type}"`);
    });

    rightIcon.resize(
      parseInt(get(tokens, `components.input.trailingIcon1.size.${size}`, String(rightIcon.height)), 10),
      parseInt(get(tokens, `components.input.trailingIcon1.size.${size}`, String(rightIcon.height)), 10)
    );
    rightIcon.setSharedPluginData("tokens", "width", `"components.input.trailingIcon1.size.${size}"`);
    rightIcon.setSharedPluginData("tokens", "height", `"components.input.trailingIcon1.size.${size}"`);
    container.appendChild(rightIcon);
  }

  const root = figma.createComponent();
  root.name = [`Type=${type}`, `Interaction=${interaction}`, `Size=${size}`].join(", ");
  root.layoutMode = "VERTICAL";
  root.primaryAxisSizingMode = "AUTO";
  root.counterAxisSizingMode = "AUTO";

  root.appendChild(labelContainer);
  root.appendChild(container);
  root.appendChild(hintContainer);

  return root;
};

const createInputSwatch = (tokens: {}) => {
  return createVariantFrames("Input", createInput, [
    { name: "type", values: ["filled", "outlined"] },
    { name: "state", values: ["default", "error", "disabled"] },
    { name: "size", values: ["small", "medium"] },
    { name: "interaction", values: ["enabled", "hovered", "focused", "interacted", "disabled"] },
    { name: "leadingIcon", values: ["true", "false"] },
    { name: "trailingIcon", values: ["true", "false"] },
  ]);
};

export { createInputSwatch, createInput };
