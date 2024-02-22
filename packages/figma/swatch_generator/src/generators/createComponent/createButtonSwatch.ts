import { TDSComponentVariant, createVariantFrames } from "./base";
import tokens from "../../../../../../build/json/tokens.json";
import { bindTokensToHelpers } from "@common/utils";
import { once } from "lodash";

const { setSize, setBorderColor, setBorderRadius, setBorderWidth, setColor, setFont, setGap, setPadding, setShadow } =
  bindTokensToHelpers(tokens);

const getStartIcon = once(() => figma.importComponentByKeyAsync("2b4e95a716ab03254027092e34e07727a4254af1"));
const getEndIcon = once(() => figma.importComponentByKeyAsync("2b4e95a716ab03254027092e34e07727a4254af1"));

function createButton({ interaction, variant, state, type, size, icon }: TDSComponentVariant) {
  const label = figma.createText();
  label.characters = "Label";
  setFont(label, `components.Button.c=font.v=${size}`);
  if (state !== "disabled") {
    setColor(label, `components.Button.c=color.t=${type}.s=${state}.v=${variant}.l=text.p=color`);
  } else {
    setColor(label, `components.Button.c=color.t=${type}.s=disabled.v=disabled.l=text.p=color`);
  }

  const root = figma.createComponent();
  root.name = [
    `Interaction=${interaction}`,
    `Variant=${variant}`,
    `State=${state}`,
    `Type=${type}`,
    `Size=${size}`,
    `Icon=${icon}`,
  ].join(", ");
  root.layoutMode = "HORIZONTAL";
  root.primaryAxisSizingMode = "AUTO";
  root.counterAxisSizingMode = "FIXED";
  root.counterAxisAlignItems = "CENTER";

  if (icon === "start" || icon === "both") {
    const startIcon = figma.createFrame();
    startIcon.name = "start_icon";
    startIcon.resize(20, 20);
    startIcon.fills = [figma.util.solidPaint("rgba(0,0,0,0)")];
    getStartIcon().then((Component) => {
      const icon = Component.createInstance();
      icon.resize(20, 20);

      (icon.children[0] as FrameNode).children.forEach((child) => {
        const n = child as FrameNode;
        if (state !== "disabled") {
          setColor(n, `components.Button.c=color.t=${type}.s=${state}.v=${variant}.l=text.p=color`);
          setBorderColor(n, `components.Button.c=color.t=${type}.s=${state}.v=${variant}.l=text.p=color`);
        } else {
          setColor(n, `components.Button.c=color.t=${type}.s=disabled.v=disabled.l=text.p=color`);
          setBorderColor(n, `components.Button.c=color.t=${type}.s=disabled.v=disabled.l=text.p=color`);
        }
      });

      startIcon.appendChild(icon);
    });
    root.appendChild(startIcon);
  }
  root.appendChild(label);

  if (icon === "end" || icon === "both") {
    const endIcon = figma.createFrame();
    endIcon.name = "end_icon";
    endIcon.resize(20, 20);
    endIcon.fills = [figma.util.solidPaint("rgba(0,0,0,0)")];
    getEndIcon().then((Component) => {
      const icon = Component.createInstance();
      icon.resize(20, 20);

      (icon.children[0] as FrameNode).children.forEach((child) => {
        const n = child as FrameNode;
        if (state !== "disabled") {
          setColor(n, `components.Button.c=color.t=${type}.s=${state}.v=${variant}.l=text.p=color`);
          setBorderColor(n, `components.Button.c=color.t=${type}.s=${state}.v=${variant}.l=text.p=color`);
        } else {
          setColor(n, `components.Button.c=color.t=${type}.s=disabled.v=disabled.l=text.p=color`);
          setBorderColor(n, `components.Button.c=color.t=${type}.s=disabled.v=disabled.l=text.p=color`);
        }
      });

      endIcon.appendChild(icon);
    });
    root.appendChild(endIcon);
  }

  if (state !== "disabled") {
    setColor(root, `components.Button.c=color.t=${type}.s=${state}.v=${variant}.l=container.p=fill.i=${interaction}`);
    setBorderColor(root, `components.Button.c=color.t=${type}.s=${state}.v=${variant}.l=container.p=border`);
  } else {
    setColor(root, `components.Button.c=color.t=${type}.s=disabled.v=disabled.l=container.p=fill.i=none`);
    setBorderColor(root, `components.Button.c=color.t=${type}.s=disabled.v=disabled.l=container.p=border`);
  }

  setShadow(root, `components.Button.c=elevation.t=${type}.i=${interaction}`);
  setPadding(root, [undefined, `components.Button.c=space.p=padding.v=${size}`]);
  setGap(root, `components.Button.c=space.p=gap.v=${size}`);
  setBorderWidth(root, `components.Button.c=size.p=borderWidth.t=${type}`);
  setBorderRadius(root, `components.Button.c=size.p=borderRadius.v=${size}`);
  setSize(root, [undefined, `components.Button.c=size.p=height.v=${size}`]);

  return root;
}

export function createButtonSwatch(tokens: {}) {
  return createVariantFrames("Button", createButton, [
    { name: "interaction", values: ["none", "hover", "active", "focus"] },
    { name: "variant", values: ["neutral", "brand", "brand2", "error"] },
    { name: "state", values: ["enabled", "disabled"] },
    { name: "type", values: ["elevated", "filled", "tonal", "outlined", "text"] },
    { name: "size", values: ["small", "medium", "large"] },
    { name: "icon", values: ["none", "start", "end", "both"] },
  ]);
}
