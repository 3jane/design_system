import * as Networker from "monorepo-networker";
import { NetworkSide } from "@common/network/sides";

interface Payload {}

type Response = string;

const PERSONAL_TOKEN = "";

export class TestMessage extends Networker.MessageType<Payload, Response> {
  receivingSide(): Networker.Side {
    return NetworkSide.PLUGIN;
  }

  /* https://www.figma.com/file/sJTDNqa8DOOjn75SnTmtyt/Material-Design-Icons-v5.9.0-Outlined?type=design&node-id=304-3895&mode=design&t=O5cV636jtaFPPs3G-4 */
  /* https://www.figma.com/file/xdYhGLuWiY2433MiyNZRLR/3Jane-Design-System---MUI-v5.14.12?type=design&node-id=1348-13792&mode=design&t=HNsU7l8hFPUSJBog-4 */

  handle(payload: Payload, from: Networker.Side): string {
    const fileKey = "xdYhGLuWiY2433MiyNZRLR";

    fetch(`https://api.figma.com/v1/files/${fileKey}/components`, {
      method: "GET",
      headers: {
        "X-Figma-Token": PERSONAL_TOKEN,
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));

    return ``;
  }
}
