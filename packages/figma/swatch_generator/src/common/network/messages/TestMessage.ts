import * as Networker from "monorepo-networker";
import {NetworkSide} from "@common/network/sides";

interface Payload {
}

type Response = string;

export class TestMessage extends Networker.MessageType<Payload, Response> {
    receivingSide(): Networker.Side {
        return NetworkSide.PLUGIN;
    }

    handle(payload: Payload, from: Networker.Side): string {
        const tokens = figma.root.getSharedPluginData("tokens", "values")
        console.log(tokens)

        const frame = figma.createFrame()
        frame.resize(100, 40);
        figma.currentPage.appendChild(frame)

        frame.setSharedPluginData(
            'tokens',
            'fill',
            '"components.button.container.fillColor.filled.error.enabled"'
        )

        console.log(frame.getSharedPluginData("tokens", 'fill'))

        return ``;
    }
}
