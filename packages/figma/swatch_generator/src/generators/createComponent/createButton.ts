import {CreateComponentFn, TDSComponent, TDSComponentTokens, TDSComponentVariant} from "./base";
import {JSON, JSONObject} from "@common/types/json";
import {get} from 'lodash-es';

import {hexToFigmaRGB} from "@figma-plugin/helpers";

class TDSButtonVariant extends TDSComponentVariant {
    constructor(
        public type: string,
        public color: string,
        public interaction: string,
        public size: string
    ) {
        super()
    }

    static fromJSON(json: any): TDSButtonVariant {
        // Validate specific to TDSButtonVariant structure
        if (
            !json || typeof json !== 'object'
            || !json.type || !json.color || !json.interaction || !json.size
        ) {
            console.log(json)
            throw new Error("Invalid JSON data for TDSButtonVariant");
        }

        const instance = new TDSButtonVariant(
            json.type,
            json.color,
            json.interaction,
            json.size
        );
        Object.assign(instance, json);
        // Here, you can add more specific validations for ButtonTokens

        return instance;
    }
}


class TDSButtonTokens extends TDSComponentTokens {
    [key: string]: JSON;

    constructor(
        public container: JSONObject,
        public icon: JSONObject,
        public label: JSONObject,
    ) {
        super();
    }

    static fromJSON(json: any): TDSButtonTokens {
        // Validate specific to ButtonTokens structure
        if (!json || typeof json !== 'object' || !json.container || !json.icon || !json.label) {
            console.log(json)
            throw new Error("Invalid JSON data for ButtonTokens");
        }

        const instance = new TDSButtonTokens(
            json.container,
            json.icon,
            json.label
        );
        Object.assign(instance, json);
        // Here, you can add more specific validations for ButtonTokens

        return instance;
    }
}

class TDSButton extends TDSComponent {
    static fromTokens(tokens: TDSButtonTokens, variant: TDSButtonVariant): TDSButton {
        throw Error('Not Implemented')
    }
}

interface CreateButtonFn extends CreateComponentFn {
    (tokens: TDSButtonTokens, variant: TDSButtonVariant): FrameNode | ComponentNode;
}

const createButton: CreateButtonFn = (
    tokens,
    variant
): FrameNode | ComponentNode => {
    const {container, label, icon}: TDSButtonTokens = TDSButtonTokens.fromJSON(tokens)
    const {type, color, interaction, size}: TDSButtonVariant = TDSButtonVariant.fromJSON(variant)

    const button = figma.createFrame();
    button.name = `button_${type}_${color}_${interaction}_${size}`;

    console.log(container)
    console.log(type, color, interaction)


    // Set color
    button.fills = [{
        type: 'SOLID',
        color: (() => {
            const hex = get(container, `fillColor.${type}.${color}.${interaction}`) as any
            // console.log(hex)
            return hexToFigmaRGB(hex)
        })()
    }];

    // Enable autolayout
    button.layoutMode = "HORIZONTAL"; // Set Auto Layout horizontally
    button.primaryAxisSizingMode = "AUTO"; // Width will hug content
    button.counterAxisSizingMode = "FIXED"; // Fixed height
    button.counterAxisAlignItems = "CENTER"; // Center items vertically

    const gap = parseInt(get(container, `gap.${size}`) as string, 10)
    const padding = parseInt(get(container, `padding.${size}`) as string, 10)
    const height = parseInt(get(container, `height.${size}`) as string, 10)
    const radius = parseInt(get(container, `borderRadius.${size}`) as string, 10)
    // Set spacing
    button.itemSpacing = gap // Adjust spacing between items inside the button
    button.verticalPadding = padding // Adjust padding as needed
    button.horizontalPadding = padding // Adjust padding as needed
    button.cornerRadius = radius

    // Set size
    button.resizeWithoutConstraints(button.width, height) // Fixed height of 40

    // Add label
    const textNode = figma.createText();
    textNode.fills = [{
        type: 'SOLID',
        color: (() => {
            const hex = get(label, `textColor.${type}.${color}`) as any
            // console.log(hex)
            return hexToFigmaRGB(hex)
        })()
    }]; // Red color

    textNode.characters = `Button`;
    button.appendChild(textNode);

    return button
}

export {
    createButton,
    TDSButtonVariant,
    TDSButtonTokens,
}
