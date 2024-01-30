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
        //
        // frame.setSharedPluginData(
        //     'tokens',
        //     'fill',
        //     JSON.stringify({
        //         "type": "color",
        //         "value": "{semantics.color.theme.current.error.main}",
        //         "name": "components.button.container.fillColor.filled.error.enabled",
        //         "$extensions": {
        //             "id": "0a08d021-48a1-488f-9928-b86a6b549d86"
        //         }
        //     })
        // )

        console.log(frame.getSharedPluginData("tokens", 'fill'))
        // -> components.button.container.fillColor.filled.error.enabled

        // Inspect has no tokens
        // After launching token studio console shows:
        // SyntaxError {message: "unexpected token: 'components'", ...}

        // console.log(tokens)
        return ``;
    }
}
