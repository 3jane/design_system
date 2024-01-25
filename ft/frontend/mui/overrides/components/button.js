import "lodash.product";
import _ from "lodash";
import tokens from "../../../../build/json/tokens.json";

export const supportedButtonSizes = ["large", "medium", "small"];
export const supportedButtonVariants = [
 "elevated",
 "filled",
 "tonal",
 "outlined",
 "text",
];
export const supportedButtonColors = [
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
 styleOverrides: {
  root: {
   // No uppercase
   textTransform: "none",
   // Sizes
   "&.MuiButton-sizeSmall": {
    height: _.get(tokens, "components.button.size.small.height"),
    borderRadius: _.get(tokens, "components.button.size.small.radius"),
    font: _.get(tokens, "components.button.font.small"),
   },
   "&.MuiButton-sizeMedium": {
    height: _.get(tokens, "components.button.size.medium.height"),
    borderRadius: _.get(tokens, "components.button.size.medium.radius"),
    font: _.get(tokens, "components.button.font.medium"),
   },
   "&.MuiButton-sizeLarge": {
    height: _.get(tokens, "components.button.size.large.height"),
    borderRadius: _.get(tokens, "components.button.size.large.radius"),
    font: _.get(tokens, "components.button.font.large"),
   },
  },
 },
 // Variant x Color styles
 variants: _.product(supportedButtonVariants, supportedButtonColors).map(
  ([variant, color]) => {
   const style = {
    props: { variant: variant, color: color },
    style: {
     color: _.get(tokens, `components.button.color[${variant}][${color}].text`),
     borderColor: _.get(
      tokens,
      `components.button.color[${variant}][${color}].border`
     ),
     backgroundColor: _.get(
      tokens,
      `components.button.color[${variant}][${color}].fill`
     ),
     borderWidth: _.get(tokens, `components.button.border[${variant}]`),
     boxShadow: _.get(
      tokens,
      `components.button.elevation[${variant}].enabled`
     ),
     "&:hover": {
      backgroundColor: _.get(
       tokens,
       `components.button.color[${variant}][${color}].hovered`
      ),
      boxShadow: _.get(
       tokens,
       `components.button.elevation[${variant}].hovered`
      ),
     },
     "&:focus": {
      boxShadow: _.get(
       tokens,
       `components.button.elevation[${variant}].focused`
      ),
     },
     "&:active": {
      backgroundColor: _.get(
       tokens,
       `components.button.color[${variant}][${color}].pressed`
      ),
      boxShadow: _.get(
       tokens,
       `components.button.elevation[${variant}].active`
      ),
     },
     "&.MuiButton-icon": {
      color: _.get(
       tokens,
       `components.button.color[${variant}][${color}].text`
      ),
     },
    },
   };
   return style;
  }
 ),
};
