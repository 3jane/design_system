import { TDSComponentVariant, createVariantFrames } from "./base";
import tokens from "../../../../../../build/json/tokens.json";
import { bindTokensToHelpers, traverse } from "@common/utils";
import { once } from "lodash";

const { setSize, setBorderColor, setBorderRadius, setBorderWidth, setColor, setFont, setGap, setPadding, setShadow } =
  bindTokensToHelpers(tokens);

const getStartIcon = once(() => figma.importComponentByKeyAsync("4a3b2c86322231d7337cd3fcf9ecb56fc7fe22cc"));
const getEndIcon = once(() => figma.importComponentByKeyAsync("2eb5e9d74defd731edcb28c0bca2151e53c1870e"));

function createInput({ color, mode, state, interaction, size, startIcon, endIcon }: Record<string, string>) {
  const root = figma.createComponent();
  root.name = [
    `Interaction=${interaction}`,
    `Color=${color}`,
    `Mode=${mode}`,
    `State=${state}`,
    `Size=${size}`,
    `StartIcon=${startIcon}`,
    `EndIcon=${endIcon}`,
  ].join(", ");
  root.layoutMode = "VERTICAL";
  root.primaryAxisSizingMode = "AUTO";
  root.counterAxisSizingMode = "AUTO";
  setGap(root, `components.Input.c=space.l=mainContainer.p=gap.v=${size}`);

  const labelContainer = figma.createFrame();
  labelContainer.fills = [figma.util.solidPaint("rgba(0,0,0,0)")];
  labelContainer.name = "label-container";
  labelContainer.layoutMode = "HORIZONTAL";
  labelContainer.counterAxisAlignItems = "CENTER";
  labelContainer.counterAxisSizingMode = "AUTO";
  labelContainer.primaryAxisSizingMode = "AUTO";
  setPadding(labelContainer, [undefined, `components.Input.c=space.l=labelContainer.p=padding.v=${size}`]);

  const label = figma.createText();
  label.name = "label";
  label.characters = "Label";
  setFont(label, `components.Input.c=font.l=labelText.v=${size}`);
  if (state !== "disabled") {
    setColor(label, `components.Input.c=color.m=${mode}.s=${state}.v=${color}.l=labelText.p=color`);
  } else {
    setColor(label, `components.Input.c=color.m=${mode}.s=${state}.v=disabled.l=labelText.p=color`);
  }
  labelContainer.appendChild(label);

  const inputContainer = figma.createFrame();
  inputContainer.name = "input-container";
  inputContainer.layoutMode = "HORIZONTAL";
  inputContainer.counterAxisAlignItems = "CENTER";
  inputContainer.counterAxisSizingMode = "AUTO";
  inputContainer.primaryAxisSizingMode = "AUTO";

  setSize(inputContainer, [undefined, `components.Input.c=size.l=inputContainer.p=height.v=${size}`]);
  setBorderRadius(inputContainer, `components.Input.c=size.l=inputContainer.p=borderRadius.v=${size}`);
  setBorderWidth(inputContainer, `components.Input.c=size.l=inputContainer.p=borderWidth.v=${size}`);
  setShadow(inputContainer, `components.Input.c=elevation.m=${mode}.v=${color}.i=${interaction}`);
  if (state !== "disabled") {
    setColor(
      inputContainer,
      `components.Input.c=color.m=${mode}.s=${state}.v=${color}.l=inputContainer.p=fill.i=${interaction}`
    );
    setBorderColor(
      inputContainer,
      `components.Input.c=color.m=${mode}.s=${state}.v=${color}.l=inputContainer.p=border.i=${interaction}`
    );
  } else {
    setColor(inputContainer, `components.Input.c=color.m=${mode}.s=disabled.v=disabled.l=inputContainer.p=fill.i=none`);
    setBorderColor(
      inputContainer,
      `components.Input.c=color.m=${mode}.s=disabled.v=disabled.l=inputContainer.p=border.i=none`
    );
  }

  if (startIcon !== "true" && endIcon !== "true") {
    setGap(inputContainer, `components.Input.c=space.l=inputContainer.p=gap.v=${size}`);
    setPadding(inputContainer, [undefined, `components.Input.c=space.l=inputContainer.p=padding.v=${size}`]);
  } else if (startIcon !== "true" && endIcon === "true") {
    setPadding(inputContainer, [
      undefined,
      undefined,
      undefined,
      `components.Input.c=space.l=inputContainer.p=padding.v=${size}`,
    ]);
  } else if (startIcon === "true" && endIcon !== "true") {
    setPadding(inputContainer, [
      undefined,
      `components.Input.c=space.l=inputContainer.p=padding.v=${size}`,
      undefined,
      undefined,
    ]);
  }

  if (startIcon === "true") {
    const startIconContainer = figma.createFrame();
    startIconContainer.fills = [figma.util.solidPaint("rgba(0,0,0,0)")];
    startIconContainer.name = "start-icon-container";
    startIconContainer.layoutMode = "HORIZONTAL";
    startIconContainer.counterAxisAlignItems = "CENTER";
    startIconContainer.primaryAxisAlignItems = "CENTER";
    startIconContainer.counterAxisSizingMode = "FIXED";
    startIconContainer.primaryAxisSizingMode = "FIXED";
    startIconContainer.resize(40, 40);
    inputContainer.appendChild(startIconContainer);

    getStartIcon().then((Component) => {
      const instance = Component.createInstance();
      instance.resize(20, 20);

      traverse(instance, ["VECTOR"], (node) => {
        const v = node as VectorNode;
        if (state !== "disabled") {
          setColor(v, `components.Input.c=color.m=${mode}.s=${state}.v=${color}.l=inputText.p=color.i=${interaction}`);
          setBorderColor(
            v,
            `components.Input.c=color.m=${mode}.s=${state}.v=${color}.l=inputText.p=color.i=${interaction}`
          );
        } else {
          setColor(v, `components.Input.c=color.m=${mode}.s=disabled.v=disabled.l=inputText.p=color.i=none`);
          setBorderColor(v, `components.Input.c=color.m=${mode}.s=disabled.v=disabled.l=inputText.p=color.i=none`);
        }
      });

      startIconContainer.appendChild(instance);
    });
  }

  const inputText = figma.createText();
  inputText.name = "input";
  inputText.characters = "vadim@fingertips.com";
  setFont(inputText, `components.Input.c=font.l=inputText.v=${size}`);
  if (state !== "disabled") {
    setColor(
      inputText,
      `components.Input.c=color.m=${mode}.s=${state}.v=${color}.l=inputText.p=color.i=${interaction}`
    );
  } else {
    setColor(inputText, `components.Input.c=color.m=${mode}.s=disabled.v=disabled.l=inputText.p=color.i=none`);
  }
  inputContainer.appendChild(inputText);

  if (endIcon === "true") {
    const endIconContainer = figma.createFrame();
    endIconContainer.fills = [figma.util.solidPaint("rgba(0,0,0,0)")];
    endIconContainer.name = "end-icon-container";
    endIconContainer.layoutMode = "HORIZONTAL";
    endIconContainer.counterAxisAlignItems = "CENTER";
    endIconContainer.primaryAxisAlignItems = "CENTER";
    endIconContainer.counterAxisSizingMode = "FIXED";
    endIconContainer.primaryAxisSizingMode = "FIXED";
    endIconContainer.resize(40, 40);
    inputContainer.appendChild(endIconContainer);

    getEndIcon().then((Component) => {
      const instance = Component.createInstance();
      instance.resize(20, 20);

      traverse(instance, ["VECTOR"], (node) => {
        const v = node as VectorNode;
        if (state !== "disabled") {
          setColor(v, `components.Input.c=color.m=${mode}.s=${state}.v=${color}.l=inputText.p=color.i=${interaction}`);
          setBorderColor(
            v,
            `components.Input.c=color.m=${mode}.s=${state}.v=${color}.l=inputText.p=color.i=${interaction}`
          );
        } else {
          setColor(v, `components.Input.c=color.m=${mode}.s=disabled.v=disabled.l=inputText.p=color.i=none`);
          setBorderColor(v, `components.Input.c=color.m=${mode}.s=disabled.v=disabled.l=inputText.p=color.i=none`);
        }
      });

      endIconContainer.appendChild(instance);
    });
  }

  const hintContainer = figma.createFrame();
  hintContainer.fills = [figma.util.solidPaint("rgba(0,0,0,0)")];
  hintContainer.name = "hint-container";
  hintContainer.layoutMode = "HORIZONTAL";
  hintContainer.counterAxisAlignItems = "CENTER";
  hintContainer.counterAxisSizingMode = "AUTO";
  hintContainer.primaryAxisSizingMode = "AUTO";
  setPadding(hintContainer, [undefined, `components.Input.c=space.l=hintContainer.p=padding.v=${size}`]);

  const hint = figma.createText();
  hint.name = "hint";
  hint.characters = "Hint";
  setFont(hint, `components.Input.c=font.l=hintText.v=${size}`);
  if (state !== "disabled") {
    setColor(hint, `components.Input.c=color.m=${mode}.s=${state}.v=${color}.l=hintText.p=color`);
  } else {
    setColor(hint, `components.Input.c=color.m=${mode}.s=disabled.v=disabled.l=hintText.p=color`);
  }
  hintContainer.appendChild(hint);

  root.appendChild(labelContainer);
  root.appendChild(inputContainer);
  root.appendChild(hintContainer);

  return root;
}

export function createInputSwatch(tokens: {}) {
  return createVariantFrames("Input", createInput, [
    {
      name: "color",
      values: ["neutral", "error"],
    },
    {
      name: "mode",
      values: ["onLight", "onDark"],
    },
    {
      name: "state",
      values: ["enabled", "disabled"],
    },
    {
      name: "interaction",
      values: ["none", "hover", "entered", "active", "focus"],
    },
    {
      name: "size",
      values: ["small", "medium"],
    },
    { name: "startIcon", values: ["true", "false"] },
    { name: "endIcon", values: ["true", "false"] },
  ]);
}
