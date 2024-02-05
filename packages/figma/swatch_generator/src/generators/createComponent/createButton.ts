import { CreateComponentFn, TDSComponentTokens, TDSComponentVariant, createVariantFrames } from "./base";
import { JSON, JSONObject } from "@common/types/json";
import svg from "../../ui/assets/icon.svg?raw";

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

  // LEFT ICON
  const leftIcon = figma.createNodeFromSvg(svg);
  leftIcon.name = "left-icon";
  leftIcon.setSharedPluginData("tokens", "width", `"components.button.icon.size.${size}"`);
  leftIcon.setSharedPluginData("tokens", "height", `"components.button.icon.size.${size}"`);
  leftIcon.children.forEach((it) => {
    it.setSharedPluginData("tokens", "fill", `"components.button.icon.fillColor.${type}.${color}"`);
    it.setSharedPluginData("tokens", "border", `"components.button.icon.fillColor.${type}.${color}"`);
  });

  // RIGHT ICON
  const rightIcon = leftIcon.clone();
  rightIcon.name = "right-icon";

  // TEXT
  const textNode = figma.createText();
  textNode.name = "label";
  textNode.setSharedPluginData("tokens", "fill", `"components.button.label.textColor.${type}.${color}"`);
  textNode.setSharedPluginData("tokens", "typography", `"components.button.label.font.${size}"`);
  textNode.characters = `Button`;

  // BUTTON
  const button = figma.createFrame();
  button.name = [type, color, interaction, size].join(", ");
  button.layoutMode = "HORIZONTAL";
  button.primaryAxisSizingMode = "AUTO";
  button.counterAxisSizingMode = "FIXED";
  button.counterAxisAlignItems = "CENTER";
  button.setSharedPluginData(
    "tokens",
    "fill",
    `"components.button.container.fillColor.${type}.${color}.${interaction}"`
  );
  button.setSharedPluginData("tokens", "border", `"components.button.container.borderColor.${type}"`);
  button.setSharedPluginData("tokens", "itemSpacing", `"components.button.container.gap.${size}"`);
  button.setSharedPluginData("tokens", "height", `"components.button.container.height.${size}"`);
  button.setSharedPluginData("tokens", "verticalPadding", `"components.button.container.padding.${size}"`);
  button.setSharedPluginData("tokens", "horizontalPadding", `"components.button.container.padding.${size}"`);
  button.setSharedPluginData("tokens", "borderRadius", `"components.button.container.borderRadius.${size}"`);
  button.setSharedPluginData("tokens", "borderWidth", `"components.button.container.borderWidth.${size}"`);
  button.appendChild(leftIcon);
  button.appendChild(textNode);
  button.appendChild(rightIcon);

  return button;
};

const createButtonSwatch = (tokens: {}) => {
  return createVariantFrames("Button", createButton, tokens, [
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
