import { ComponentType, createComponent as createComponentMock } from "./createComponent/base";
import { createButtonSwatch } from "./createComponent/createButtonSwatch";
import { createIconSwatch } from "./createComponent/createIconSwatch";

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
      default:
        createComponent = createComponentMock;
    }

    const tokens = JSON.parse(figma.root.getSharedPluginData("tokens", "values"))["3ds/ft/components"];

    const swatchFrame = createComponent(tokens);

    figma.currentPage.appendChild(swatchFrame);
    figma.viewport.scrollAndZoomIntoView([swatchFrame]);
  }
};

export { createComponentSwatch, Variant, SwatchParams, CreateSwatchFn };
