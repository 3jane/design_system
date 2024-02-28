import { createVariantFrames } from "./base";
import tokens from "../../../../../../build/json/tokens.json";
import { bindTokensToHelpers, traverse } from "@common/utils";
import { once } from "lodash";

const { setSize, setBorderColor, setBorderRadius, setBorderWidth, setColor } = bindTokensToHelpers(tokens);

const getCheckedIcon = once(() => figma.importComponentByKeyAsync("46e477b5bc82f8e7f04100d9dea49c785bf6f684"));
const getIndeterminateIcon = once(() => figma.importComponentByKeyAsync("764e1e26ea7d726ac8043dba0c120192c202a69a"));
const getUncheckedIcon = once(() => figma.importComponentByKeyAsync("404836f5a9c5b7a57e59090596f9ef2e14f4ba37"));

function createCheckboxButton({ color, mode, type, state, interaction, indeterminate }: Record<string, string>) {
  const root = figma.createComponent();
  root.name = [
    `Interaction=${interaction}`,
    `Mode=${mode}`,
    `State=${state}`,
    `Type=${type}`,
    `Color=${color}`,
    `Indeterminate=${indeterminate}`,
  ].join(", ");
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
  setSize(halo, [`components.Checkbox.c=size.l=halo.p=size`, `components.Checkbox.c=size.l=halo.p=size`]);
  setBorderWidth(halo, `components.Checkbox.c=size.l=halo.p=borderWidth`);
  setBorderRadius(halo, `components.Checkbox.c=size.l=halo.p=borderRadius`);

  if (state !== "disabled") {
    setColor(
      halo,
      `components.Checkbox.c=color.m=${mode}.t=${type}.s=${state}.v=${color}.l=halo.p=fill.i=${interaction}`
    );
  } else {
    setColor(
      halo,
      `components.Checkbox.c=color.m=${mode}.t=${type}.s=${state}.v=disabled.l=halo.p=fill.i=${interaction}`
    );
  }

  const icon = figma.createFrame();
  icon.name = "icon";
  icon.layoutMode = "HORIZONTAL";
  icon.primaryAxisAlignItems = "CENTER";
  icon.counterAxisAlignItems = "CENTER";
  icon.fills = [figma.util.solidPaint("rgba(0,0,0,0)")];
  setSize(icon, [`components.Checkbox.c=size.l=icon.p=size`, `components.Checkbox.c=size.l=icon.p=size`]);

  let getIcon = indeterminate === "false" ? getCheckedIcon : getIndeterminateIcon;
  if (state === "unchecked") {
    getIcon = getUncheckedIcon;
  }

  getIcon().then((Component) => {
    const instance = Component.createInstance();
    instance.resize(24, 24);

    traverse(instance, ["VECTOR"], (node) => {
      const v = node as VectorNode;
      if (state !== "disabled") {
        setColor(v, `components.Checkbox.c=color.m=${mode}.t=${type}.s=${state}.v=${color}.l=icon.p=fill`);
        setBorderColor(v, `components.Checkbox.c=color.m=${mode}.t=${type}.s=${state}.v=${color}.l=icon.p=fill`);
      } else {
        setColor(v, `components.Checkbox.c=color.m=${mode}.t=${type}.s=${state}.v=disabled.l=icon.p=fill`);
        setBorderColor(v, `components.Checkbox.c=color.m=${mode}.t=${type}.s=${state}.v=disabled.l=icon.p=fill`);
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

export function createCheckboxSwatch(tokens: {}) {
  return createVariantFrames("Checkbox", createCheckboxButton, [
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
    {
      name: "indeterminate",
      values: ["true", "false"],
    },
  ]);
}
