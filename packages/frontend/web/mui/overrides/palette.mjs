import _ from "lodash";
import tokens from "./tokens.json";

export const supportedColors = ["primary", "secondary", "neutral", "success", "error", "warning", "info", "digital", "disabled"]

export const palette = {
    palette: {
        "common": {
            white: tokens.semantics.color.theme.current.common.white,
            black: tokens.semantics.color.theme.current.common.black,
            transparent: tokens.semantics.color.theme.current.common.transparent
        },
        ..._.mapValues(_.keyBy(supportedColors), (v, k) => {
            return {
                main: tokens.semantics.color.theme.current[k].main,
                onMain: tokens.semantics.color.theme.current[k].onMain,
                container: tokens.semantics.color.theme.current[k].container,
                onContainer: tokens.semantics.color.theme.current[k].onContainer
            }
        })
    },
    shadows: Object.values(tokens.composites.elevation)
}

export default _.merge(
    palette
)
