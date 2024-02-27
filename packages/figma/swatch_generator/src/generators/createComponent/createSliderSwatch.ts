import { createVariantFrames } from "./base";
import tokens from "../../../../../../build/json/tokens.json";
import { bindTokensToHelpers, traverse } from "@common/utils";
import { once } from "lodash";

const { setSize, setBorderColor, setBorderRadius, setBorderWidth, setColor } = bindTokensToHelpers(tokens);

const getCheckedIcon = once(() => figma.importComponentByKeyAsync("9b2f087530194da0c858e7baabfbd7350256d437"));
const getUncheckedIcon = once(() => figma.importComponentByKeyAsync("d18b168f6dc89da2510a60256212eb7254063546"));
// {
//   name: "layer",
//   values: ["track", "rail", "mark", "thumb", "halo"],
// },
function createSlider({ color, mode, state, interaction }: Record<string, string>) {
  const root = figma.createComponent();
  root.name = [`Interaction=${interaction}`, `Mode=${mode}`, `State=${state}`, `Color=${color}`].join(", ");
  root.layoutMode = "HORIZONTAL";
  root.primaryAxisSizingMode = "AUTO";
  root.counterAxisSizingMode = "AUTO";
  root.primaryAxisAlignItems = "CENTER";
  root.counterAxisAlignItems = "CENTER";
  root.clipsContent = false;

  const rail = figma.createFrame();
  rail.name = "rail";
  rail.clipsContent = false;
  setSize(rail, [undefined, `components.Slider.c=size.l=rail.p=height`]);
  setBorderRadius(rail, `components.Slider.c=size.l=rail.p=borderRadius`);
  setColor(
    rail,
    state === "disabled"
      ? `components.Slider.c=color.m=${mode}.s=${state}.v=disabled.l=rail.p=fill`
      : `components.Slider.c=color.m=${mode}.s=${state}.v=${color}.l=rail.p=fill`
  );

  const track = figma.createFrame();
  track.name = "track";
  track.layoutMode = "HORIZONTAL";
  track.primaryAxisAlignItems = "MAX";
  track.counterAxisAlignItems = "CENTER";
  track.clipsContent = false;
  track.resize(rail.width / 2, 8);
  setSize(track, [undefined, `components.Slider.c=size.l=track.p=height`]);
  setBorderRadius(track, `components.Slider.c=size.l=track.p=borderRadius`);
  setColor(
    track,
    state === "disabled"
      ? `components.Slider.c=color.m=${mode}.s=${state}.v=disabled.l=track.p=fill`
      : `components.Slider.c=color.m=${mode}.s=${state}.v=${color}.l=track.p=fill`
  );

  const halo = figma.createFrame();
  halo.name = "halo";
  halo.layoutMode = "HORIZONTAL";
  halo.primaryAxisAlignItems = "CENTER";
  halo.counterAxisAlignItems = "CENTER";
  halo.clipsContent = false;
  setSize(halo, [`components.Slider.c=size.l=halo.p=height`, `components.Slider.c=size.l=halo.p=height`]);
  setBorderRadius(halo, `components.Slider.c=size.l=halo.p=borderRadius`);
  setBorderWidth(halo, `components.Slider.c=size.l=halo.p=borderWidth`);
  setColor(
    halo,
    state === "disabled"
      ? `components.Slider.c=color.m=${mode}.s=${state}.v=disabled.l=halo.p=fill.i=${interaction}`
      : `components.Slider.c=color.m=${mode}.s=${state}.v=${color}.l=halo.p=fill.i=${interaction}`
  );

  const thumb = figma.createFrame();
  thumb.name = "thumb";
  setSize(thumb, [`components.Slider.c=size.l=thumb.p=height`, `components.Slider.c=size.l=thumb.p=height`]);
  setBorderRadius(thumb, `components.Slider.c=size.l=thumb.p=borderRadius`);
  setBorderWidth(thumb, `components.Slider.c=size.l=thumb.p=borderWidth`);
  setColor(
    thumb,
    state === "disabled"
      ? `components.Slider.c=color.m=${mode}.s=${state}.v=disabled.l=thumb.p=fill`
      : `components.Slider.c=color.m=${mode}.s=${state}.v=${color}.l=thumb.p=fill`
  );
  setBorderColor(
    thumb,
    state === "disabled"
      ? `components.Slider.c=color.m=${mode}.s=${state}.v=disabled.l=thumb.p=border`
      : `components.Slider.c=color.m=${mode}.s=${state}.v=${color}.l=thumb.p=border`
  );

  const container = figma.createFrame();
  container.name = "container";
  container.layoutMode = "HORIZONTAL";
  container.primaryAxisAlignItems = "CENTER";
  container.counterAxisAlignItems = "CENTER";
  container.fills = [figma.util.solidPaint("rgba(0,0,0,0)")];
  container.clipsContent = false;
  container.resize(1, 1);

  halo.appendChild(thumb);
  container.appendChild(halo);
  track.appendChild(container);
  rail.appendChild(track);
  root.appendChild(rail);

  return root;
}

export function createSliderSwatch(tokens: {}) {
  return createVariantFrames("Slider", createSlider, [
    {
      name: "color",
      values: ["neutral", "brand", "brand2", "disabled"],
    },
    {
      name: "mode",
      values: ["onLight", "onDark"],
    },
    {
      name: "state",
      values: ["enabled", "disabled"],
    },
    {
      name: "interaction",
      values: ["none", "active", "hover", "focus"],
    },
  ]);
}
