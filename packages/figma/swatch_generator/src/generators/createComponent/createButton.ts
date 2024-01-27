import {CreateComponentFn, TDSComponent, TDSComponentTokens, TDSComponentVariant} from "./base";
import {JSON, JSONObject} from "@common/types/json";
import { get } from 'lodash-es';


class TDSButtonVariant extends TDSComponentVariant {
    constructor(
        public type: string,
        public color: string,
        public interaction: string,
        public size: string
    ) {
        super()
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
    if (~(tokens instanceof TDSButtonTokens)) {
        throw Error('Expected (tokens instanceof TDSButtonTokens) === true')
    }
    if (~(variant instanceof TDSButtonVariant)) {
        throw Error('Expected (variant instanceof TDSButtonVariant) === true')
    }

    const {
        type,
        color,
        interaction,
        size
    } = variant as TDSButtonVariant
    const {
        container,
        label,
        icon
    } = tokens as TDSButtonTokens

    const button = figma.createFrame();
    button.name = `button_${type}_${color}_${interaction}_${size}`;

    // Set color
    button.fills = [{
        type: 'SOLID',
        color: get(container, `fillColor.${type}.${color}.${interaction}`) as any
    }];

    // Enable autolayout
    button.layoutMode = "HORIZONTAL"; // Set Auto Layout horizontally
    button.primaryAxisSizingMode = "AUTO"; // Width will hug content
    button.counterAxisSizingMode = "FIXED"; // Fixed height
    button.counterAxisAlignItems = "CENTER"; // Center items vertically

    // Set spacing
    button.itemSpacing = get(container, `gap.${size}`) as any // Adjust spacing between items inside the button
    button.verticalPadding = get(container, `padding.${size}`) as any // Adjust padding as needed
    button.horizontalPadding = get(container, `padding.${size}`) as any // Adjust padding as needed

    // Set size
    button.resizeWithoutConstraints(button.width, get(container, `height.${size}`) as any); // Fixed height of 40

    // Add label
    const textNode = figma.createText();
    textNode.characters = `Button`;
    button.appendChild(textNode);

    return button
}

export {
    createButton,
    TDSButtonVariant,
    TDSButtonTokens,
}
