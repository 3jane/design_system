import { createVariantFrames } from "./base";

import tokens from "../../../../../../build/json/tokens.json";

import { bindTokensToHelpers, traverse } from "@common/utils";
import { once } from "lodash";

const { setSize, setBorderColor, setColor, setBorderRadius, setBorderWidth, setFont } = bindTokensToHelpers(tokens);

const getIcon = once(() => figma.importComponentByKeyAsync("2b7f59c3648fb7b37741fd4d3542876afc78f9db"));

function createPagination({ color, mode, type, state, interaction, shape, icon }: Record<string, string>) {
  const root = figma.createComponent();
  root.name = [
    `Color=${color}`,
    `Mode=${mode}`,
    `Type=${type}`,
    `State=${state}`,
    `Interaction=${interaction}`,
    `Shape=${shape}`,
    `Icon=${icon}`,
  ].join(", ");
  root.layoutMode = "HORIZONTAL";
  root.primaryAxisSizingMode = "AUTO";
  root.counterAxisSizingMode = "FIXED";
  root.primaryAxisAlignItems = "CENTER";
  root.counterAxisAlignItems = "CENTER";
  setSize(root, [`components.Pagination.c=size.p=size`, `components.Pagination.c=size.p=size`]);
  setBorderRadius(root, `components.Pagination.c=size.p=borderRadius.v=${shape}`);
  setBorderWidth(root, `components.Pagination.c=size.p=borderWidth.v=${shape}`);
  setBorderColor(root, `components.Pagination.c=color.m=onLight.t=selected.s=enabled.v=brand.l=container.p=border`);
  if (state !== "disabled") {
    setColor(
      root,
      `components.Pagination.c=color.m=${mode}.t=${type}.s=${state}.v=${color}.l=container.p=fill.i=${interaction}`
    );
  } else {
    setColor(
      root,
      `components.Pagination.c=color.m=${mode}.t=${type}.s=${state}.v="disabled".l=container.p=fill.i=${interaction}`
    );
  }

  if (icon === "true") {
    const icon = figma.createFrame();
    icon.name = "icon";
    icon.layoutMode = "HORIZONTAL";
    icon.primaryAxisAlignItems = "CENTER";
    icon.counterAxisAlignItems = "CENTER";
    icon.fills = [figma.util.solidPaint("rgba(0,0,0,0)")];
    icon.resize(22, 22);
    root.appendChild(icon);

    getIcon().then((Component) => {
      const instance = Component.createInstance();
      instance.resize(22, 22);

      traverse(instance, ["VECTOR"], (node) => {
        const v = node as VectorNode;
        if (state !== "disabled") {
          setColor(v, `components.Pagination.c=color.m=${mode}.t=${type}.s=${state}.v=${color}.l=text.p=color`);
          setBorderColor(v, `components.Pagination.c=color.m=${mode}.t=${type}.s=${state}.v=${color}.l=text.p=color`);
        } else {
          setColor(v, `components.Pagination.c=color.m=${mode}.t=${type}.s=${state}.v=disabled.l=text.p=color`);
          setBorderColor(v, `components.Pagination.c=color.m=${mode}.t=${type}.s=${state}.v=disabled.l=text.p=color`);
        }
      });

      icon.appendChild(instance);
    });
  } else {
    const label = figma.createText();
    label.characters = "1";
    setFont(label, `components.Pagination.c=font.t=${type}`);
    if (state !== "disabled") {
      setColor(label, `components.Pagination.c=color.m=${mode}.t=${type}.s=${state}.v=${color}.l=text.p=color`);
    } else {
      setColor(label, `components.Pagination.c=color.m=${mode}.t=${type}.s=${state}.v=disabled.l=text.p=color`);
    }
    root.appendChild(label);
  }

  return root;
}

export function createPaginationSwatch() {
  return createVariantFrames("Pagination", createPagination, [
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
      values: ["selected", "deselected"],
    },
    {
      name: "state",
      values: ["enabled", "disabled"],
    },
    {
      name: "interaction",
      values: ["none", "hover", "active", "focus"],
    },
    {
      name: "shape",
      values: ["rounded", "circular"],
    },
    {
      name: "icon",
      values: ["true", "false"],
    },
  ]);
}
