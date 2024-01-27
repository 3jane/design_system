import {ComponentType, createComponent as createComponentMock, CreateComponentFn} from "./createComponent/base";
import {createButton} from "./createComponent/createButton";

interface Variant {
    name: string;
    values: string[];
}

interface SwatchParams {
    componentType: ComponentType;
    tokens: Object;
    variants: Variant[];
}

type CreateSwatchFn = (params: SwatchParams) => void;

const createComponentSwatch: CreateSwatchFn = (
    {
        componentType,
        tokens,
        variants,
    }: SwatchParams
): void => {
    if (figma.editorType === "figma") {

        let createComponent
        switch (componentType) {
            case ComponentType.Button:
                createComponent = createButton;
                break;
            default:
                createComponent = createComponentMock
        }

        let containerFrame = figma.createFrame();
        containerFrame.name = `${componentType} Swatch`;
        containerFrame.layoutMode = "VERTICAL";
        containerFrame.primaryAxisSizingMode = "AUTO";
        containerFrame.counterAxisSizingMode = "AUTO";
        containerFrame.primaryAxisAlignItems = "CENTER";
        containerFrame.counterAxisAlignItems = "CENTER";
        containerFrame.itemSpacing = 20;
        containerFrame.paddingTop = 0;
        containerFrame.paddingBottom = 0;

        createVariantFrames(containerFrame, createComponent, tokens, variants, {}, 0);

        figma.currentPage.appendChild(containerFrame);
        figma.viewport.scrollAndZoomIntoView([containerFrame]);
        // figma.closePlugin();
    }
}

function createVariantFrames(
    parentFrame: FrameNode,
    createFn: CreateComponentFn,
    tokens: Object,
    variants: Variant[],
    variantValues: { [key: string]: string } = {},
    depth: number = 0,
) {
    if (depth >= variants.length) {
        // All variants have been processed, call createFn
        parentFrame.appendChild(createFn(tokens, variantValues));
        return;
    }

    const variant = variants[depth];
    variant.values.forEach(value => {
        // Build the object for createFn
        const updatedVariantValues = {...variantValues, [variant.name]: value};

        // Create a new frame for each variant option if not the last variant
        if (depth < variants.length - 1) {
            let frame = figma.createFrame();
            frame.name = `${variant.name}: ${value}`;

            const isEven = depth % 2 === 0
            const isPenultimate = depth === variants.length - 2

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
            createVariantFrames(frame, createFn, tokens, variants, updatedVariantValues, depth + 1);
        } else {
            // Last variant, call createFn directly
            createVariantFrames(parentFrame, createFn, tokens, variants, updatedVariantValues, depth + 1);
        }
    });
}

export {
    createComponentSwatch,
    Variant,
    SwatchParams,
    CreateSwatchFn
}
