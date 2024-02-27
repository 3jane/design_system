import { createVariantFrames } from "./base";
import tokens from "../../../../../../build/json/tokens.json";
import { bindTokensToHelpers, traverse } from "@common/utils";
import { once } from "lodash";

const { setSize, setBorderColor, setBorderRadius, setBorderWidth, setColor } = bindTokensToHelpers(tokens);

const getCheckedIcon = once(() => figma.importComponentByKeyAsync("76fa7dfa06744eae660f355f1291c264c8c8b2ce"));
const getIndeterminateIcon = once(() => figma.importComponentByKeyAsync("e68419391a7a0ffc8c0cb7dca6bd8b2748837b3e"));

function createCheckboxButton({ color, mode, type, state, interaction }: Record<string, string>) {
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
  setSize(icon, [`components.Checkbox.c=size.l=icon.p=size`, `components.Checkbox.c=size.l=icon.p=size`]);

  if (type === "checked") {
    getCheckedIcon().then((Component) => {
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
  } else {
    if (state !== "disabled") {
      setBorderColor(icon, `components.Checkbox.c=color.m=${mode}.t=${type}.s=${state}.v=${color}.l=icon.p=fill`);
    } else {
      setBorderColor(icon, `components.Checkbox.c=color.m=${mode}.t=${type}.s=${state}.v=disabled.l=icon.p=fill`);
    }
  }

  halo.appendChild(icon);
  root.appendChild(halo);

  return root;
}

export function createCheckboxSwatch(tokens: {}) {
  return createVariantFrames("Checkbox", createCheckboxButton, [
    {
      name: "color",
      values: ["neutral", "brand", "brand2", "disabled"],
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
