import _ from "lodash";
import tokens from "../../../build/json/tokens.json";

export const supportedColors = [
 "primary",
 "secondary",
 "neutral",
 "success",
 "error",
 "warning",
 "info",
 "digital",
 "disabled",
];

export default {
 common: {
  white: _.get(tokens, "semantics.color.theme.current.common.white"),
  black: _.get(tokens, "semantics.color.theme.current.common.black"),
  transparent: _.get(
   tokens,
   "semantics.color.theme.current.common.transparent"
  ),
 },
 ..._.mapValues(_.keyBy(supportedColors), (v, k) => {
  return {
   main: _.get(tokens, `semantics.color.theme.current[${k}].main`),
   onMain: _.get(tokens, `semantics.color.theme.current[${k}].onMain`),
   container: _.get(tokens, `semantics.color.theme.current[${k}].container`),
   onContainer: _.get(
    tokens,
    `semantics.color.theme.current[${k}].onContainer`
   ),
  };
 }),
};
