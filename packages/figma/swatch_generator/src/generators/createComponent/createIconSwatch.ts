import { TDSComponentVariant, createVariantFrames } from "./base";

import tokens from "../../../../../../build/json/tokens.json";

import { bindTokensToHelpers } from "@common/utils";

const { setSize, setBorderColor, setColor } = bindTokensToHelpers(tokens);

function createIcon({ variant, size, mode, state }: TDSComponentVariant) {
  const root = figma.createComponent();
  root.name = [`Mode=${mode}`, `Size=${size}`, `Variant=${variant}`, `State=${state}`].join(", ");
  setSize(root, [`components.Icon.c=size.v=${size}`, `components.Icon.c=size.v=${size}`]);

  figma.importComponentByKeyAsync("2b4e95a716ab03254027092e34e07727a4254af1").then((Component) => {
    const icon = Component.createInstance();
    setSize(icon, [`components.Icon.c=size.v=${size}`, `components.Icon.c=size.v=${size}`]);

    (icon.children[0] as FrameNode).children.forEach((child) => {
      if (state === "disabled") {
        setColor(child as FrameNode, `components.Icon.c=color.m=${mode}.s=disabled.p=color.v=disabled`);
        setBorderColor(child as FrameNode, `components.Icon.c=color.m=${mode}.s=disabled.p=color.v=disabled`);
      } else {
        setColor(child as FrameNode, `components.Icon.c=color.m=${mode}.s=${state}.p=color.v=${variant}`);
        setBorderColor(child as FrameNode, `components.Icon.c=color.m=${mode}.s=${state}.p=color.v=${variant}`);
      }
    });

    root.appendChild(icon);
  });

  return root;
}

export function createIconSwatch() {
  return createVariantFrames("Icon", createIcon, [
    { name: "size", values: ["small", "medium", "large"] },
    { name: "variant", values: ["neutral", "brand", "brand2", "error"] },
    { name: "mode", values: ["onLight", "onDark"] },
    { name: "state", values: ["enabled", "disabled"] },
  ]);
}
