import * as Networker from "monorepo-networker";
import { initializeNetwork } from "@common/network/init";
import { NetworkSide } from "@common/network/sides";
import { NetworkMessages } from "@common/network/messages";

async function bootstrap() {
  initializeNetwork(NetworkSide.PLUGIN)

  if (figma.editorType === "figma") {
    figma.showUI(__html__, {
      width: 320,
      height: 480,
      title: "My Figma Plugin!",
    });
  }

  await figma.loadFontAsync({ family: "Inter", style: "Regular" })

  console.log("Bootstrapped @", Networker.Side.current.getName());

  NetworkMessages.HELLO_UI.send({ text: "Hey there, UI!" });
}

bootstrap();
