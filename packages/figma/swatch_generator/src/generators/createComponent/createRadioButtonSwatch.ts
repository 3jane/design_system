import { createVariantFrames } from "./base";
import tokens from "../../../../../../build/json/tokens.json";
import { bindTokensToHelpers, traverse } from "@common/utils";
import { once } from "lodash";

const { setSize, setBorderColor, setBorderRadius, setBorderWidth, setColor } = bindTokensToHelpers(tokens);

const getCheckedIcon = once(() => figma.importComponentByKeyAsync("9b2f087530194da0c858e7baabfbd7350256d437"));
const getUncheckedIcon = once(() => figma.importComponentByKeyAsync("d18b168f6dc89da2510a60256212eb7254063546"));

function createRadioButton({ color, mode, type, state, interaction }: Record<string, string>) {
  const root = figma.createComponent();
  root.name = [`Interaction=${interaction}`, `Mode=${mode}`, `State=${state}`, `Type=${type}`, `Color=${color}`].join(
    ", "
  );
  root.layoutMode = "HORIZONTAL";
  root.primaryAxisSizingMode = "AUTO";
  root.counterAxisSizingMode = "AUTO";
  root.primaryAxisAlignItems = "CENTER";
  root.counterAxisAlignItems = "CENTER";

  const halo = figma.createFrame();
  halo.name = "halo";
  halo.layoutMode = "HORIZONTAL";
  halo.primaryAxisSizingMode = "FIXED";
  halo.counterAxisSizingMode = "FIXED";
  halo.primaryAxisAlignItems = "CENTER";
  halo.counterAxisAlignItems = "CENTER";
  setSize(halo, [`components.RadioButton.c=size.l=halo.p=size`, `components.RadioButton.c=size.l=halo.p=size`]);
  setBorderWidth(halo, `components.RadioButton.c=size.l=halo.p=borderWidth`);
  setBorderRadius(halo, `components.RadioButton.c=size.l=halo.p=borderRadius`);
  if (state !== "disabled") {
    setColor(
      halo,
      `components.RadioButton.c=color.m=${mode}.t=${type}.s=${state}.v=${color}.l=halo.p=fill.i=${interaction}`
    );
  } else {
    setColor(
      halo,
      `components.RadioButton.c=color.m=${mode}.t=${type}.s=${state}.v=disabled.l=halo.p=fill.i=${interaction}`
    );
  }

  const icon = figma.createFrame();
  icon.name = "icon";
  icon.layoutMode = "HORIZONTAL";
  icon.primaryAxisAlignItems = "CENTER";
  icon.counterAxisAlignItems = "CENTER";
  icon.fills = [figma.util.solidPaint("rgba(0,0,0,0)")];

  const getIcon = type === "checked" ? getCheckedIcon : getUncheckedIcon;

  getIcon().then((Component) => {
    const instance = Component.createInstance();
    instance.resize(24, 24);

    traverse(instance, ["VECTOR"], (node) => {
      const v = node as VectorNode;
      if (state !== "disabled") {
        setColor(v, `components.RadioButton.c=color.m=${mode}.t=${type}.s=${state}.v=${color}.l=icon.p=fill`);
        setBorderColor(v, `components.RadioButton.c=color.m=${mode}.t=${type}.s=${state}.v=${color}.l=icon.p=fill`);
      } else {
        setColor(v, `components.RadioButton.c=color.m=${mode}.t=${type}.s=${state}.v=disabled.l=icon.p=fill`);
        setBorderColor(v, `components.RadioButton.c=color.m=${mode}.t=${type}.s=${state}.v=disabled.l=icon.p=fill`);
      }
    });

    icon.appendChild(instance);
    icon.layoutSizingHorizontal = "HUG";
    icon.layoutSizingVertical = "HUG";
  });

  halo.appendChild(icon);
  root.appendChild(halo);

  return root;
}

export function createRadioButtonSwatch(tokens: {}) {
  return createVariantFrames("RadioButton", createRadioButton, [
    {
      name: "color",
      values: ["neutral", "brand", "brand2"],
    },
    {
      name: "mode",
      values: ["onLight", "onDark"],
    },
    {
      name: "type",
      values: ["checked", "unchecked"],
    },
    {
      name: "state",
      values: ["enabled", "disabled"],
    },
    {
      name: "interaction",
      values: ["none", "hover", "focus", "active"],
    },
  ]);
}
