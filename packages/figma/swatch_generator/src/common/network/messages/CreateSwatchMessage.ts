import {NetworkSide} from "@common/network/sides";
import * as Networker from "monorepo-networker";
import {CreateSwatchFn, SwatchParams} from "../../../generators/createComponentSwatch";

interface CreateSwatchPayload {
    frame: FrameNode | PageNode,
    fn: CreateSwatchFn,
    params: SwatchParams
}

class CreateSwatchMessage extends Networker.MessageType<CreateSwatchPayload> {
    public receivingSide(): Networker.Side {
        return NetworkSide.PLUGIN;
    }

    public handle({frame, fn, params}: CreateSwatchPayload, from: Networker.Side): void {
        fn(frame, params)
    }
}

export {
    CreateSwatchMessage,
    CreateSwatchPayload
}
