import { ComponentType, createComponent as createComponentMock } from "./createComponent/base";
import { createBadgeSwatch } from "./createComponent/createBadgeSwatch";
import { createBreadcrumbsSwatch } from "./createComponent/createBreadcrumbsSwatch";
import { createButtonSwatch } from "./createComponent/createButtonSwatch";
import { createCheckboxSwatch } from "./createComponent/createCheckboxSwatch";
import { createFabSwatch } from "./createComponent/createFabSwatch";
import { createIconSwatch } from "./createComponent/createIconSwatch";
import { createInputSwatch } from "./createComponent/createInputSwatch";
import { createPaginationSwatch } from "./createComponent/createPaginationSwatch";
import { createRadioButtonSwatch } from "./createComponent/createRadioButtonSwatch";
import { createSliderSwatch } from "./createComponent/createSliderSwatch";
import { createSwitchSwatch } from "./createComponent/createSwitchSwatch";
import { createTagSwatch } from "./createComponent/createTagSwatch";

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
      case ComponentType.Tag:
        createComponent = createTagSwatch;
        break;
      case ComponentType.Badge:
        createComponent = createBadgeSwatch;
        break;
      case ComponentType.RadioButton:
        createComponent = createRadioButtonSwatch;
        break;
      case ComponentType.Checkbox:
        createComponent = createCheckboxSwatch;
        break;
      case ComponentType.Slider:
        createComponent = createSliderSwatch;
        break;
      case ComponentType.Pagination:
        createComponent = createPaginationSwatch;
        break;
      case ComponentType.Breadcrumbs:
        createComponent = createBreadcrumbsSwatch;
        break;
      case ComponentType.Input:
        createComponent = createInputSwatch;
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
