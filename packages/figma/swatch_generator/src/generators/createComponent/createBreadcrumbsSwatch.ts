import { createVariantFrames } from "./base";

import tokens from "../../../../../../build/json/tokens.json";

import { bindTokensToHelpers, traverse } from "@common/utils";
import { once, set } from "lodash";

const { setSize, setBorderColor, setColor, setFont, setGap, setPadding, setBorderRadius, setBorderWidth } =
  bindTokensToHelpers(tokens);

const getChevronIcon = once(() => figma.importComponentByKeyAsync("2b7f59c3648fb7b37741fd4d3542876afc78f9db"));
const getPlusIcon = once(() => figma.importComponentByKeyAsync("a48e204eb8061dccc2095b67a4c09d22d15c652a"));

function createLink({ color, mode, type, state, interaction, separator }: Record<string, string>) {
  const link = figma.createFrame();
  link.name = "link";
  link.layoutMode = "HORIZONTAL";
  link.counterAxisAlignItems = "CENTER";
  link.layoutSizingHorizontal = "HUG";
  link.layoutSizingVertical = "HUG";

  setGap(link, `components.Breadcrumbs.c=space.l=linkContainer.p=gap`);
  setPadding(link, [
    `components.Breadcrumbs.c=space.l=linkContainer.p=paddingVertical`,
    `components.Breadcrumbs.c=space.l=linkContainer.p=paddingHorizontal`,
  ]);
  setBorderRadius(link, `components.Breadcrumbs.c=size.l=linkContainer.p=borderRadius`);
  setBorderWidth(link, `components.Breadcrumbs.c=size.l=linkContainer.p=borderWidth`);
  setBorderColor(link, `components.Breadcrumbs.c=color.m=${mode}.t=${type}.s=${state}.v=${color}.l=container.p=border`);

  if (state !== "disabled") {
    setColor(
      link,
      `components.Breadcrumbs.c=color.m=${mode}.t=${type}.s=${state}.v=${color}.l=container.p=fill.i=${interaction}`
    );
  } else {
    setColor(
      link,
      `components.Breadcrumbs.c=color.m=${mode}.t=${type}.s=${state}.v=disabled.l=container.p=fill.i=${interaction}`
    );
  }

  const icon = figma.createFrame();
  icon.name = "icon";
  icon.fills = [figma.util.solidPaint("rgba(0,0,0,0)")];
  icon.resize(16, 16);
  link.appendChild(icon);
  getPlusIcon().then((Component) => {
    const instance = Component.createInstance();
    instance.resize(icon.width, icon.height);

    traverse(instance, ["VECTOR"], (node) => {
      const v = node as VectorNode;
      if (state !== "disabled") {
        setColor(v, `components.Breadcrumbs.c=color.m=${mode}.t=${type}.s=${state}.v=brand.l=text.p=color`);
        setBorderColor(v, `components.Breadcrumbs.c=color.m=${mode}.t=${type}.s=${state}.v=brand.l=text.p=color`);
      } else {
        setColor(v, `components.Breadcrumbs.c=color.m=${mode}.t=${type}.s=${state}.v=disabled.l=text.p=color`);
        setBorderColor(v, `components.Breadcrumbs.c=color.m=${mode}.t=${type}.s=${state}.v=disabled.l=text.p=color`);
      }
    });

    icon.appendChild(instance);
  });

  const label = figma.createText();
  label.name = "label";
  label.characters = "Label";
  setFont(label, `components.Breadcrumbs.c=font.l=link.t=${type}`);
  if (state !== "disabled") {
    setColor(label, `components.Breadcrumbs.c=color.m=${mode}.t=${type}.s=${state}.v=brand.l=text.p=color`);
  } else {
    setColor(label, `components.Breadcrumbs.c=color.m=${mode}.t=${type}.s=${state}.v=disabled.l=text.p=color`);
  }
  link.appendChild(label);

  return link;
}

function createSeparator({ color, mode, type, state, interaction, separator }: Record<string, string>) {
  const container = figma.createFrame();
  container.name = "separator";
  container.layoutMode = "HORIZONTAL";
  container.primaryAxisSizingMode = "AUTO";
  container.counterAxisSizingMode = "FIXED";
  container.primaryAxisAlignItems = "CENTER";
  container.counterAxisAlignItems = "CENTER";
  container.layoutSizingHorizontal = "HUG";
  container.layoutSizingVertical = "HUG";
  container.minHeight = 14 * 1.25;
  container.fills = [figma.util.solidPaint("rgba(0,0,0,0)")];

  if (separator === "text") {
    setSize(container, [`components.Breadcrumbs.c=size.l=textSeparatorContainer.p=width`, undefined]);

    const label = figma.createText();
    label.name = "label";
    label.characters = "/";
    setFont(label, `components.Breadcrumbs.c=font.l=textSeparator`);
    if (state !== "disabled") {
      setColor(label, `components.Breadcrumbs.c=color.m=${mode}.t=${type}.s=${state}.v=brand.l=text.p=color`);
    } else {
      setColor(label, `components.Breadcrumbs.c=color.m=${mode}.t=${type}.s=${state}.v=disabled.l=text.p=color`);
    }
    container.appendChild(label);
  } else {
    setSize(container, [`components.Breadcrumbs.c=size.l=iconSeparatorContainer.p=width`, undefined]);

    const icon = figma.createFrame();
    icon.name = "icon";
    icon.fills = [figma.util.solidPaint("rgba(0,0,0,0)")];
    setSize(icon, [
      `components.Breadcrumbs.c=size.l=iconSeparator.p=size`,
      `components.Breadcrumbs.c=size.l=iconSeparator.p=size`,
    ]);
    container.appendChild(icon);
    getChevronIcon().then((Component) => {
      const instance = Component.createInstance();
      instance.resize(icon.width, icon.height);

      traverse(instance, ["VECTOR"], (node) => {
        const v = node as VectorNode;
        if (state !== "disabled") {
          setColor(v, `components.Breadcrumbs.c=color.m=${mode}.t=${type}.s=${state}.v=brand.l=text.p=color`);
          setBorderColor(v, `components.Breadcrumbs.c=color.m=${mode}.t=${type}.s=${state}.v=brand.l=text.p=color`);
        } else {
          setColor(v, `components.Breadcrumbs.c=color.m=${mode}.t=${type}.s=${state}.v=disabled.l=text.p=color`);
          setBorderColor(v, `components.Breadcrumbs.c=color.m=${mode}.t=${type}.s=${state}.v=disabled.l=text.p=color`);
        }
      });

      icon.appendChild(instance);
    });
  }

  return container;
}

function createBreadcrumbs({ color, mode, type, state, interaction, separator }: Record<string, string>) {
  const root = figma.createComponent();
  root.name = [
    `Color=${color}`,
    `Mode=${mode}`,
    `Type=${type}`,
    `State=${state}`,
    `Interaction=${interaction}`,
    `Separator=${separator}`,
  ].join(", ");
  root.layoutMode = "HORIZONTAL";
  root.primaryAxisSizingMode = "AUTO";
  root.counterAxisSizingMode = "FIXED";
  root.primaryAxisAlignItems = "CENTER";
  root.counterAxisAlignItems = "CENTER";
  root.layoutSizingHorizontal = "HUG";
  root.layoutSizingVertical = "HUG";

  root.appendChild(createLink({ color, mode, type: "deselected", state, interaction: "none", separator }));
  root.appendChild(createSeparator({ color, mode, type, state, interaction, separator }));
  root.appendChild(createLink({ color, mode, type: "deselected", state, interaction: "none", separator }));
  root.appendChild(createSeparator({ color, mode, type, state, interaction, separator }));
  root.appendChild(createLink({ color, mode, type, state, interaction, separator }));

  return root;
}

export function createBreadcrumbsSwatch() {
  return createVariantFrames("Breadcrumbs", createBreadcrumbs, [
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
      name: "separator",
      values: ["text", "icon"],
    },
  ]);
}
