import { createVariantFrames } from "./base";
import tokens from "../../../../../../build/json/tokens.json";
import { bindTokensToHelpers } from "@common/utils";

const { setSize, setBorderColor, setBorderRadius, setBorderWidth, setColor, setFont, setGap, setPadding, setShadow } =
  bindTokensToHelpers(tokens);

function createBadge({ variant, state, type, size, mode }: Record<string, string>) {
  const root = figma.createComponent();
  root.name = [`Variant=${variant}`, `Mode=${mode}`, `Size=${size}`].join(", ");
  root.layoutMode = "HORIZONTAL";
  root.primaryAxisSizingMode = "AUTO";
  root.counterAxisSizingMode = "FIXED";
  root.primaryAxisAlignItems = "CENTER";
  root.counterAxisAlignItems = "CENTER";

  if (size === "standard") {
    const label = figma.createText();
    label.characters = "1";
    setFont(label, `components.Badge.c=font.v=${size}`);
    setColor(label, `components.Badge.c=color.m=${mode}.v=${variant}.l=text.p=color`);
    root.appendChild(label);
  }

  if (state !== "disabled") {
    setColor(root, `components.Badge.c=color.m=${mode}.v=${variant}.l=container.p=fill`);
    setBorderColor(root, `components.Badge.c=color.m=${mode}.v=${variant}.l=container.p=border`);
  } else {
    setColor(root, `components.Badge.c=colo.m=${mode}r.t=${type}.s=disabled.v=disabled.l=container.p=fill.i=none`);
    setBorderColor(root, `components.Badge.c=color.m=${mode}.t=${type}.s=disabled.v=disabled.l=container.p=border`);
  }

  setShadow(root, `components.Badge.c=elevation.v=${variant}`);
  setBorderWidth(root, `components.Badge.c=size.p=borderWidth.v=${size}`);
  setBorderRadius(root, `components.Badge.c=size.p=borderRadius`);
  setSize(root, [`components.Badge.c=size.p=size.v=${size}`, `components.Badge.c=size.p=size.v=${size}`]);

  return root;
}

export function createBadgeSwatch(tokens: {}) {
  return createVariantFrames("Badge", createBadge, [
    { name: "variant", values: ["neutral", "brand", "brand2"] },
    { name: "mode", values: ["onLight", "onDark"] },
    { name: "size", values: ["standard", "dot"] },
  ]);
}
