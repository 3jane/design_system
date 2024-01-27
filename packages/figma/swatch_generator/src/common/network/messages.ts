import {CreateSwatchMessage} from "@common/network/messages/CreateSwatchMessage";
import {HelloMessage} from "@common/network/messages/HelloMessage";
import {PingMessage} from "@common/network/messages/PingMessage";
import {NetworkSide} from "@common/network/sides";
import * as Networker from "monorepo-networker";

namespace NetworkMessages {
    export const registry = new Networker.MessageTypeRegistry();

    export const PING = registry.register(
        new PingMessage("ping")
    );

    export const HELLO_PLUGIN = registry.register(
        new HelloMessage(NetworkSide.PLUGIN)
    );

    export const HELLO_UI = registry.register(
        new HelloMessage(NetworkSide.UI)
    );

    export const CREATE_SWATCH = registry.register(
        new CreateSwatchMessage("create-swatch")
    );
}

export {
    NetworkMessages
}
