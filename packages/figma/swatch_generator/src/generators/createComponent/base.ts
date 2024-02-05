import { JSONObject } from "@common/types/json";

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
  (variant: TDSComponentVariant): FrameNode | ComponentNode;
}

const createComponent: CreateComponentFn = (variant) => {
  throw Error("Must be extended by a specific component");
};

interface Variant {
  name: string;
  values: string[];
}
function createVariants(
  componentType: string,
  createFn: CreateComponentFn,
  tokens: Object,
  variants: Variant[]
): FrameNode | ComponentNode {
  const rootFrame = figma.createFrame();
  rootFrame.name = `${componentType} Swatch`;
  rootFrame.layoutMode = "VERTICAL";
  rootFrame.primaryAxisSizingMode = "AUTO";
  rootFrame.counterAxisSizingMode = "AUTO";
  rootFrame.primaryAxisAlignItems = "CENTER";
  rootFrame.counterAxisAlignItems = "CENTER";
  rootFrame.itemSpacing = 20;
  rootFrame.paddingTop = 0;
  rootFrame.paddingBottom = 0;

  function _recursive(
    parentFrame: FrameNode,
    tokens: Object,
    variants: Variant[],
    variantValues: { [key: string]: string } = {},
    depth: number = 0
  ) {
    if (depth >= variants.length) {
      parentFrame.appendChild(createFn(variantValues));
      return;
    }

    const variant = variants[depth];
    variant.values.forEach((value) => {
      const updatedVariantValues = { ...variantValues, [variant.name]: value };

      // Create a new frame for each variant option if not the last variant
      if (depth < variants.length - 1) {
        let frame = figma.createFrame();
        frame.name = `${variant.name}: ${value}`;

        const isEven = depth % 2 === 0;
        const isPenultimate = depth === variants.length - 2;

        frame.layoutMode = isEven ? "HORIZONTAL" : "VERTICAL";
        frame.primaryAxisSizingMode = "AUTO";
        frame.counterAxisSizingMode = "AUTO";
        frame.primaryAxisAlignItems = "CENTER";
        frame.counterAxisAlignItems = "CENTER";
        frame.itemSpacing = isPenultimate ? 10 : 20;
        frame.verticalPadding = isPenultimate ? 10 : 20;
        frame.horizontalPadding = isPenultimate ? 10 : 20;

        parentFrame.appendChild(frame);

        // Recursive call to process the next level
        _recursive(frame, tokens, variants, updatedVariantValues, depth + 1);
      } else {
        // Last variant, call createFn directly
        _recursive(parentFrame, tokens, variants, updatedVariantValues, depth + 1);
      }
    });
  }

  _recursive(rootFrame, tokens, variants, {}, 0);

  return rootFrame;
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
