import {NetworkSide} from "@common/network/sides";
import * as Networker from "monorepo-networker";
import {createComponentSwatch, SwatchParams} from "../../../generators/createComponentSwatch";

interface CreateSwatchPayload extends SwatchParams {}

class CreateSwatchMessage extends Networker.MessageType<CreateSwatchPayload> {
    public receivingSide(): Networker.Side {
        return NetworkSide.PLUGIN;
    }

    public handle(payload: CreateSwatchPayload, from: Networker.Side): void {
        createComponentSwatch(payload)
    }
}

export {
    CreateSwatchMessage,
    CreateSwatchPayload
}
