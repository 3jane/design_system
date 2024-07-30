import type { Components, Theme } from "@mui/material";

declare module "@mui/material" {
  interface RadioPropsSizeOverrides {}

  interface RadioPropsColorOverrides {
    primary: false;
    secondary: false;
    info: false;
    success: false;
    warning: false;
    default: false;

    brand: true;
    neutral: true;
    error: true;
  }
}

export const MuiRadio: Components<Omit<Theme, "components">>["MuiRadio"] = {
  defaultProps: {
    disableRipple: true,
  },
  styleOverrides: {
    root: ({ theme, ownerState }) => {
      const disabled = ownerState.disabled;
      const color = ownerState.color!;

      const size = theme.semantic.size["2xs"];
      const halo = theme.semantic.size.lg;

      const uncheckedColor = disabled
        ? theme.semantic.color.text.disabled["l=1"]
        : theme.semantic.color.text.neutral["a=4"];

      const checkedColor = disabled
        ? theme.semantic.color.text.disabled["l=1"]
        : theme.semantic.color.text[color]["a=1"];

      let bgColors = [];

      if (color === "neutral") {
        bgColors = [
          undefined,
          theme.semantic.color.bg.neutral["o=2"],
          theme.semantic.color.bg.neutral["o=3"],
          theme.semantic.color.bg.neutral["o=2"],
        ];
      } else {
        bgColors = [
          undefined,
          theme.semantic.color.bg[color]["o=1"],
          theme.semantic.color.bg[color]["o=2"],
          theme.semantic.color.bg[color]["o=1"],
        ];
      }

      return {
        position: "relative",
        padding: 0,
        width: size,
        height: size,

        color: uncheckedColor,

        "&:before": {
          position: "absolute",
          content: '""',
          width: halo,
          height: halo,
          backgroundColor: disabled ? "none" : bgColors[0],
          zIndex: -1,
          borderRadius: theme.semantic.shape.radius.full,
          pointerEvents: "none",
          transform: "scale(0)",
          transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
          }),
        },

        "& .MuiSvgIcon-root": {
          width: size,
          height: size,
        },

        "&:has(input:checked)": {
          color: checkedColor,
        },
        '&:has(input[data-indeterminate="true"])': {
          color: checkedColor,
        },

        "&:hover:before": {
          transform: "scale(1)",
          backgroundColor: disabled ? "none" : bgColors[1],
        },
        "&:active:before": {
          transform: "scale(1)",
          backgroundColor: disabled ? "none" : bgColors[2],
        },
        "&:has(input:focus-visible):before": {
          transform: "scale(1)",
          backgroundColor: disabled ? "none" : bgColors[3],
        },
      };
    },
  },
};
