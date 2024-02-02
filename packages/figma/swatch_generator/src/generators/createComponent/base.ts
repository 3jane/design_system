import {JSONObject} from "@common/types/json";

enum ComponentType {
    Button = 'Button'
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
        throw Error('Must be implemented by a subclass')
    }
}

abstract class TDSComponent {
    static fromTokens(tokens: TDSComponentTokens, variant: TDSComponentVariant): TDSComponent {
        throw Error('Must be implemented by a subclass')
    }
}

interface CreateComponentFn {
    (tokens: TDSComponentTokens, variant: TDSComponentVariant): FrameNode | ComponentNode;
}

const createComponent: CreateComponentFn = (tokens, variant) => {
    throw Error('Must be extended by a specific component')
}

export {
    createComponent,
    CreateComponentFn,
    TDSComponent,
    TDSComponentTokens,
    TDSComponentVariant,
    ComponentType
}