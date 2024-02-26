import { createVariantFrames } from "./base";
import tokens from "../../../../../../build/json/tokens.json";
import { bindTokensToHelpers, traverse } from "@common/utils";
import { once } from "lodash";

const { setSize, setBorderColor, setBorderRadius, setBorderWidth, setColor, setFont, setGap, setPadding, setShadow } =
  bindTokensToHelpers(tokens);

const getIcon = once(() => figma.importComponentByKeyAsync("6f7895c73a7f8191a62c4c80fcb32466b1dd6387"));

function createFabButton({ interaction, variant, state, type, size, text, mode }: Record<string, string>) {
  const root = figma.createComponent();
  root.name = [
    `Interaction=${interaction}`,
    `Variant=${variant}`,
    `State=${state}`,
    `Mode=${mode}`,
    `Type=${type}`,
    `Size=${size}`,
    `Text=${text}`,
  ].join(", ");
  root.layoutMode = "HORIZONTAL";
  root.primaryAxisSizingMode = "AUTO";
  root.counterAxisSizingMode = "FIXED";
  root.primaryAxisAlignItems = "CENTER";
  root.counterAxisAlignItems = "CENTER";

  const icon = figma.createFrame();
  icon.name = "end_icon";
  icon.resize(24, 24);
  icon.fills = [figma.util.solidPaint("rgba(0,0,0,0)")];
  root.appendChild(icon);
  getIcon().then((Component) => {
    const instance = Component.createInstance();
    instance.resize(24, 24);

    traverse(instance, ["VECTOR"], (node) => {
      const v = node as VectorNode;
      if (state !== "disabled") {
        setColor(v, `components.FAB.c=color.m=${mode}.t=${type}.s=${state}.v=${variant}.l=text.p=color`);
        setBorderColor(v, `components.FAB.c=color.m=${mode}.t=${type}.s=${state}.v=${variant}.l=text.p=color`);
      } else {
        setColor(v, `components.FAB.c=color.m=${mode}.t=${type}.s=${state}.v=disabled.l=text.p=color`);
        setBorderColor(v, `components.FAB.c=color.m=${mode}.t=${type}.s=${state}.v=disabled.l=text.p=color`);
      }
    });

    icon.appendChild(instance);
  });

  if (text === "true") {
    const label = figma.createText();
    label.characters = "Label";
    setFont(label, `components.FAB.c=font.v=${size}`);
    if (state !== "disabled") {
      setColor(label, `components.FAB.c=color.m=${mode}.t=${type}.s=${state}.v=${variant}.l=text.p=color`);
    } else {
      setColor(label, `components.FAB.c=color.m=${mode}.t=${type}.s=${state}.v=disabled.l=text.p=color`);
    }
    root.appendChild(label);
  }

  if (state !== "disabled") {
    setColor(
      root,
      `components.FAB.c=color.m=${mode}.t=${type}.s=${state}.v=${variant}.l=container.p=fill.i=${interaction}`
    );
    setBorderColor(root, `components.FAB.c=color.m=${mode}.t=${type}.s=${state}.v=${variant}.l=container.p=border`);
  } else {
    setColor(root, `components.FAB.c=colo.m=${mode}r.t=${type}.s=disabled.v=disabled.l=container.p=fill.i=none`);
    setBorderColor(root, `components.FAB.c=color.m=${mode}.t=${type}.s=disabled.v=disabled.l=container.p=border`);
  }

  setShadow(root, `components.FAB.c=elevation.t=${type}.i=${interaction}`);
  setPadding(root, [`components.FAB.c=space.p=padding.v=${size}`, `components.FAB.c=space.p=padding.v=${size}`]);
  setGap(root, `components.FAB.c=space.p=gap.v=${size}`);
  setBorderWidth(root, `components.FAB.c=size.p=borderWidth.t=${type}`);
  setBorderRadius(root, `components.FAB.c=size.p=borderRadius.v=${size}`);

  if (text === "true") {
    setSize(root, [undefined, `components.FAB.c=size.p=height.v=${size}`]);
  } else {
    setSize(root, [`components.FAB.c=size.p=height.v=${size}`, `components.FAB.c=size.p=height.v=${size}`]);
  }

  return root;
}

export function createFabSwatch(tokens: {}) {
  return createVariantFrames("FAB", createFabButton, [
    { name: "interaction", values: ["none", "hover", "active", "focus"] },
    { name: "variant", values: ["neutral", "brand", "brand2"] },
    { name: "state", values: ["enabled", "disabled"] },
    { name: "type", values: ["filled", "outlined"] },
    { name: "mode", values: ["onLight", "onDark"] },
    { name: "size", values: ["small", "medium", "large"] },
    { name: "text", values: ["true", "false"] },
  ]);
}
