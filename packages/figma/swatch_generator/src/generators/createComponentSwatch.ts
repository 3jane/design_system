import { ComponentType, createComponent as createComponentMock } from "./createComponent/base";
import { createButtonSwatch } from "./createComponent/createButtonSwatch";
import { createFabSwatch } from "./createComponent/createFabSwatch";
import { createIconSwatch } from "./createComponent/createIconSwatch";
import { createSwitchSwatch } from "./createComponent/createSwitchSwatch";

interface Variant {
  name: string;
  values: string[];
}

interface SwatchParams {
  componentType: ComponentType;
}

type CreateSwatchFn = (params: SwatchParams) => void;

const createComponentSwatch: CreateSwatchFn = ({ componentType }: SwatchParams): void => {
  if (figma.editorType === "figma") {
    let createComponent;
    switch (componentType) {
      case ComponentType.Icon:
        createComponent = createIconSwatch;
        break;
      case ComponentType.Button:
        createComponent = createButtonSwatch;
        break;
      case ComponentType.Switch:
        createComponent = createSwitchSwatch;
        break;
      case ComponentType.FAB:
        createComponent = createFabSwatch;
        break;
      default:
        createComponent = createComponentMock;
    }

    const tokens = JSON.parse(figma.root.getSharedPluginData("tokens", "values"))["3ds/ft/components"];

    const swatchFrame = createComponent(tokens);

    const whiteFrame = figma.createFrame();
    whiteFrame.name = `${componentType} Swatch`;
    whiteFrame.layoutMode = "VERTICAL";
    whiteFrame.primaryAxisSizingMode = "AUTO";
    whiteFrame.counterAxisSizingMode = "AUTO";
    whiteFrame.primaryAxisAlignItems = "CENTER";
    whiteFrame.counterAxisAlignItems = "CENTER";
    whiteFrame.horizontalPadding = 20;
    whiteFrame.verticalPadding = 20;

    whiteFrame.appendChild(swatchFrame);
    figma.currentPage.appendChild(whiteFrame);
    figma.viewport.scrollAndZoomIntoView([whiteFrame]);
  }
};

export { createComponentSwatch, Variant, SwatchParams, CreateSwatchFn };
