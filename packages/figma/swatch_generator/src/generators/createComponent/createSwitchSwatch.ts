import { createVariantFrames } from "./base";
import tokens from "../../../../../../build/json/tokens.json";
import { bindTokensToHelpers } from "@common/utils";
import { once } from "lodash";

const { setSize, setBorderColor, setBorderRadius, setBorderWidth, setColor, setFont, setGap, setPadding, setShadow } =
  bindTokensToHelpers(tokens);

const getCheckIcon = once(() => figma.importComponentByKeyAsync("685c3ad7c7404413a2450750071f41c95558f878"));

function createSwitch({ interaction, variant, state, type, mode, icon }: Record<string, string>) {
  const knob = figma.createFrame();
  knob.name = "knob";
  knob.layoutMode = "HORIZONTAL";
  knob.primaryAxisAlignItems = "CENTER";
  knob.counterAxisAlignItems = "CENTER";
  setSize(knob, [`components.Switch.c=size.l=knob.p=width`, `components.Switch.c=size.l=knob.p=height`]);
  setBorderWidth(knob, `components.Switch.c=size.l=knob.p=borderWidth`);
  setBorderRadius(knob, `components.Switch.c=size.l=knob.p=borderRadius`);
  if (state !== "disabled") {
    setColor(knob, `components.Switch.c=color.m=${mode}.t=${type}.s=${state}.v=${variant}.l=knob.p=fill`);
  } else {
    setColor(knob, `components.Switch.c=color.m=${mode}.t=${type}.s=${state}.v=disabled.l=knob.p=fill`);
  }

  if (icon === "true") {
    getCheckIcon().then((Component) => {
      const icon = Component.createInstance();
      icon.resize(16, 16);

      if (state !== "disabled") {
        setColor(
          icon.children[0] as FrameNode,
          `components.Switch.c=color.m=${mode}.t=${type}.s=${state}.v=${variant}.l=container.p=fill`
        );
      } else {
        setColor(
          icon.children[0] as FrameNode,
          `components.Switch.c=color.m=${mode}.t=${type}.s=${state}.v=disabled.l=container.p=fill`
        );
      }

      knob.appendChild(icon);
    });
  }

  const halo = figma.createFrame();
  halo.name = "halo";
  halo.layoutMode = "VERTICAL";
  halo.primaryAxisAlignItems = "CENTER";
  halo.counterAxisAlignItems = "CENTER";
  halo.appendChild(knob);
  setSize(halo, [`components.Switch.c=size.l=halo.p=width`, `components.Switch.c=size.l=halo.p=height`]);
  setBorderWidth(halo, `components.Switch.c=size.l=halo.p=borderWidth`);
  setBorderRadius(halo, `components.Switch.c=size.l=halo.p=borderRadius`);
  if (state !== "disabled") {
    setColor(
      halo,
      `components.Switch.c=color.m=${mode}.t=${type}.s=${state}.v=${variant}.l=halo.p=fill.i=${interaction}`
    );
  } else {
    setColor(
      halo,
      `components.Switch.c=color.m=${mode}.t=${type}.s=${state}.v="disabled".l=halo.p=fill.i=${interaction}`
    );
  }

  const container = figma.createFrame();
  container.name = "container";
  container.layoutMode = "HORIZONTAL";
  container.primaryAxisAlignItems = "CENTER";
  container.counterAxisAlignItems = "CENTER";
  container.fills = [figma.util.solidPaint("rgba(0,0,0,0)")];
  container.constraints = {
    horizontal: "MAX",
    vertical: "CENTER",
  };
  container.clipsContent = false;
  container.appendChild(halo);
  setSize(container, [`components.Switch.c=size.l=knob.p=width`, `components.Switch.c=size.l=knob.p=height`]);

  const root = figma.createComponent();
  root.name = [
    `Interaction=${interaction}`,
    `Variant=${variant}`,
    `State=${state}`,
    `Type=${type}`,
    `Icon=${icon}`,
    `Mode=${mode}`,
  ].join(", ");
  root.layoutMode = "HORIZONTAL";
  root.primaryAxisSizingMode = "FIXED";
  root.counterAxisSizingMode = "FIXED";
  root.primaryAxisAlignItems = type === "checked" ? "MAX" : "MIN";
  root.counterAxisAlignItems = "CENTER";

  root.appendChild(container);

  setSize(root, [`components.Switch.c=size.l=container.p=width`, `components.Switch.c=size.l=container.p=height`]);
  setPadding(root, [
    `components.Switch.c=space.l=container.p=padding`,
    `components.Switch.c=space.l=container.p=padding`,
  ]);
  setBorderWidth(root, `components.Switch.c=size.l=container.p=borderWidth.t=${type}`);
  setBorderRadius(root, `components.Switch.c=size.l=container.p=borderRadius`);
  if (state !== "disabled") {
    setColor(root, `components.Switch.c=color.m=${mode}.t=${type}.s=${state}.v=${variant}.l=container.p=fill`);
    setBorderColor(root, `components.Switch.c=color.m=${mode}.t=${type}.s=${state}.v=${variant}.l=container.p=border`);
  } else {
    setColor(root, `components.Switch.c=color.m=${mode}.t=${type}.s=${state}.v=disabled.l=container.p=fill`);
    setBorderColor(root, `components.Switch.c=color.m=${mode}.t=${type}.s=${state}.v=disabled.l=container.p=border`);
  }

  return root;
}

export function createSwitchSwatch(tokens: {}) {
  return createVariantFrames("Switch", createSwitch, [
    { name: "type", values: ["checked", "unchecked"] },
    { name: "state", values: ["enabled", "disabled"] },
    { name: "variant", values: ["neutral", "brand", "brand2"] },
    { name: "interaction", values: ["none", "hover", "active", "focus"] },
    { name: "mode", values: ["onLight", "onDark"] },
    { name: "icon", values: ["false", "true"] },
  ]);
}
