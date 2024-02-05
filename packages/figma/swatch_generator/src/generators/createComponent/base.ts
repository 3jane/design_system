import { JSONObject } from "@common/types/json";
import { hexToFigmaRGB } from "@figma-plugin/helpers";

enum ComponentType {
  Button = "Button",
}
abstract class TDSComponentVariant {
  type?: string;
  color?: string;
  interaction?: string;
  size?: string;
  state?: string;
}

abstract class TDSComponentTokens {
  // Example properties (adjust according to your needs)
  [key: string]: any;

  // Static method for instantiation from a JSON object
  static fromJSON(json: JSON): TDSComponentTokens {
    throw Error("Must be implemented by a subclass");
  }
}

abstract class TDSComponent {
  static fromTokens(tokens: TDSComponentTokens, variant: TDSComponentVariant): TDSComponent {
    throw Error("Must be implemented by a subclass");
  }
}

interface CreateComponentFn {
  (variant: TDSComponentVariant): ComponentNode;
}

const createComponent: CreateComponentFn = (variant) => {
  throw Error("Must be extended by a specific component");
};

interface Variant {
  name: string;
  values: string[];
}
function createVariants(componentType: string, createFn: CreateComponentFn, variants: Variant[]): ComponentSetNode {
  const rootFrame = figma.createFrame();
  const components: ComponentNode[] = [];

  function _recursive(variants: Variant[], variantValues: { [key: string]: string } = {}, depth: number = 0) {
    if (depth >= variants.length) {
      const component = createFn(variantValues);
      components.push(component);
      return;
    }

    const variant = variants[depth];
    variant.values.forEach((value) => {
      const updatedVariantValues = { ...variantValues, [variant.name]: value };

      _recursive(variants, updatedVariantValues, depth + 1);
    });
  }

  _recursive(variants, {}, 0);

  const componentSet = figma.combineAsVariants(components, figma.currentPage);
  componentSet.name = `${componentType}`;
  componentSet.layoutMode = "HORIZONTAL";
  componentSet.layoutWrap = "WRAP";
  componentSet.primaryAxisSizingMode = "AUTO";
  componentSet.counterAxisSizingMode = "AUTO";
  componentSet.primaryAxisAlignItems = "CENTER";
  componentSet.counterAxisAlignItems = "CENTER";
  componentSet.itemSpacing = 20;
  componentSet.counterAxisSpacing = 20;
  componentSet.verticalPadding = 40;
  componentSet.horizontalPadding = 40;
  componentSet.fills = [
    {
      type: "SOLID",
      color: hexToFigmaRGB("#fff"),
    },
  ];

  componentSet.resize(2000, componentSet.height)

  rootFrame.remove();

  return componentSet;
}

export {
  createComponent,
  createVariants as createVariantFrames,
  CreateComponentFn,
  TDSComponent,
  TDSComponentTokens,
  TDSComponentVariant,
  ComponentType,
};
