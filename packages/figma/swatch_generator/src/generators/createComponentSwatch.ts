import { ComponentType, createComponent as createComponentMock, CreateComponentFn } from "./createComponent/base";
import { createButtonSwatch } from "./createComponent/createButton";
import { createInputSwatch } from "./createComponent/createInput";

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
      case ComponentType.Button:
        createComponent = createButtonSwatch;
        break;
      case ComponentType.Input:
        createComponent = createInputSwatch;
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
