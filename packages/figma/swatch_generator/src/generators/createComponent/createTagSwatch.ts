import { TDSComponentVariant, createVariantFrames } from "./base";
import tokens from "../../../../../../build/json/tokens.json";
import { bindTokensToHelpers, traverse } from "@common/utils";
import { once } from "lodash";

const { setSize, setBorderColor, setBorderRadius, setBorderWidth, setColor, setFont, setGap, setPadding, setShadow } =
  bindTokensToHelpers(tokens);

const getStartIcon = once(() => figma.importComponentByKeyAsync("185fe6d719f1e4466e881a5441edf8c3df1e52c3"));
const getEndIcon = once(() => figma.importComponentByKeyAsync("0cdcb66765a3af18b443b69423a745a563ac8b80"));

function createTag({ interaction, variant, state, type, size, mode, startIcon, endIcon }: Record<string, string>) {
  const label = figma.createText();
  label.characters = "Label";
  setFont(label, `components.Tag.c=font.v=${size}`);
  if (state !== "disabled") {
    setColor(label, `components.Tag.c=color.m=${mode}.t=${type}.s=${state}.v=${variant}.l=text.p=color`);
  } else {
    setColor(label, `components.Tag.c=color.m=${mode}.t=${type}.s=disabled.v=disabled.l=text.p=color`);
  }

  const root = figma.createComponent();
  root.name = [
    `Interaction=${interaction}`,
    `Variant=${variant}`,
    `Mode=${mode}`,
    `State=${state}`,
    `Type=${type}`,
    `Size=${size}`,
    `StartIcon=${startIcon}`,
    `EndIcon=${endIcon}`,
  ].join(", ");
  root.layoutMode = "HORIZONTAL";
  root.primaryAxisSizingMode = "AUTO";
  root.counterAxisSizingMode = "FIXED";
  root.counterAxisAlignItems = "CENTER";

  if (startIcon === "true") {
    const startIcon = figma.createFrame();
    startIcon.name = "start_icon";
    startIcon.resize(18, 18);
    startIcon.fills = [figma.util.solidPaint("rgba(0,0,0,0)")];
    getStartIcon().then((Component) => {
      const icon = Component.createInstance();
      icon.resize(18, 18);

      traverse(icon, ["VECTOR"], (node) => {
        const v = node as VectorNode;
        if (state !== "disabled") {
          setColor(v, `components.Tag.c=color.m=${mode}.t=${type}.s=${state}.v=${variant}.l=text.p=color`);
          setBorderColor(v, `components.Tag.c=color.m=${mode}.t=${type}.s=${state}.v=${variant}.l=text.p=color`);
        } else {
          setColor(v, `components.Tag.c=color.m=${mode}.t=${type}.s=${state}.v=disabled.l=text.p=color`);
          setBorderColor(v, `components.Tag.c=color.m=${mode}.t=${type}.s=${state}.v=disabled.l=text.p=color`);
        }
      });

      startIcon.appendChild(icon);
    });
    root.appendChild(startIcon);
  }

  root.appendChild(label);

  if (endIcon === "true") {
    const endIcon = figma.createFrame();
    endIcon.name = "end_icon";
    endIcon.resize(18, 18);
    endIcon.fills = [figma.util.solidPaint("rgba(0,0,0,0)")];
    getEndIcon().then((Component) => {
      const icon = Component.createInstance();
      icon.resize(18, 18);

      traverse(icon, ["VECTOR"], (node) => {
        const v = node as VectorNode;
        if (state !== "disabled") {
          setColor(v, `components.Tag.c=color.m=${mode}.t=${type}.s=${state}.v=${variant}.l=text.p=color`);
          setBorderColor(v, `components.Tag.c=color.m=${mode}.t=${type}.s=${state}.v=${variant}.l=text.p=color`);
        } else {
          setColor(v, `components.Tag.c=color.m=${mode}.t=${type}.s=${state}.v=disabled.l=text.p=color`);
          setBorderColor(v, `components.Tag.c=color.m=${mode}.t=${type}.s=${state}.v=disabled.l=text.p=color`);
        }
      });

      endIcon.appendChild(icon);
    });
    root.appendChild(endIcon);
  }

  if (state !== "disabled") {
    setColor(
      root,
      `components.Tag.c=color.m=${mode}.t=${type}.s=${state}.v=${variant}.l=container.p=fill.i=${interaction}`
    );
    setBorderColor(root, `components.Tag.c=color.m=${mode}.t=${type}.s=${state}.v=${variant}.l=container.p=border`);
  } else {
    setColor(root, `components.Tag.c=colo.m=${mode}r.t=${type}.s=disabled.v=disabled.l=container.p=fill.i=none`);
    setBorderColor(root, `components.Tag.c=color.m=${mode}.t=${type}.s=disabled.v=disabled.l=container.p=border`);
  }

  setShadow(root, `components.Tag.c=elevation.t=${type}.i=${interaction}`);
  setPadding(root, [`components.Tag.c=space.p=padding.v=${size}`, `components.Tag.c=space.p=padding.v=${size}`]);
  setGap(root, `components.Tag.c=space.p=gap.v=${size}`);
  setBorderWidth(root, `components.Tag.c=size.p=borderWidth.t=${type}`);
  setBorderRadius(root, `components.Tag.c=size.p=borderRadius.v=${size}`);
  setSize(root, [undefined, `components.Tag.c=size.p=height.v=${size}`]);

  return root;
}

export function createTagSwatch(tokens: {}) {
  return createVariantFrames("Tag", createTag, [
    { name: "interaction", values: ["none", "hover", "active", "focus"] },
    { name: "variant", values: ["neutral", "brand", "brand2"] },
    { name: "state", values: ["enabled", "disabled"] },
    { name: "type", values: ["filled", "outlined"] },
    { name: "mode", values: ["onLight", "onDark"] },
    { name: "size", values: ["small", "medium"] },
    { name: "startIcon", values: ["true", "false"] },
    { name: "endIcon", values: ["true", "false"] },
  ]);
}
