import * as Networker from "monorepo-networker";
import { initializeNetwork } from "@common/network/init";
import { NetworkSide } from "@common/network/sides";
import { NetworkMessages } from "@common/network/messages";

import tokens from "../../../../../build/json/tokens.json";
import { cssFontToFigma } from "@common/utils";

async function loadAllFonts() {
  const fonts = Object.values(tokens.composites.font).reduce((set, { lg, md, sm }) => {
    set.add(lg);
    set.add(md);
    set.add(sm);

    return set;
  }, new Set<string>());

  await Promise.allSettled(
    [...fonts].map((it) => {
      const { family, style } = cssFontToFigma(it);

      return figma.loadFontAsync({ family, style });
    })
  );
}

async function bootstrap() {
  initializeNetwork(NetworkSide.PLUGIN);

  if (figma.editorType === "figma") {
    figma.showUI(__html__, {
      width: 320,
      height: 380,
      title: "My Figma Plugin!",
    });
  }

  await loadAllFonts();

  console.log("Bootstrapped @", Networker.Side.current.getName());

  NetworkMessages.HELLO_UI.send({ text: "Hey there, UI!" });
}

bootstrap();
