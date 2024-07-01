import type { Components, Theme } from "@mui/material";

declare module "@mui/material" {
  interface SwitchPropsSizeOverrides {}

  interface SwitchPropsColorOverrides {
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

export const MuiSwitch: Components<Omit<Theme, "components">>["MuiSwitch"] = {
  defaultProps: {
    disableRipple: true,
  },
  styleOverrides: {
    root: ({ theme }) => {
      const height = theme.semantic.size.md;
      const width = theme.semantic.size["4xl"];

      return {
        width,
        height,
        padding: 0,
        overflow: "visible",
      };
    },
    track: ({ theme, ownerState }) => {
      const color = ownerState.color!;

      return {
        opacity: 1,

        borderRadius: theme.semantic.shape.radius.full,
        borderWidth: theme.semantic.shape.border.lg,
        borderStyle: "solid",
        borderColor: theme.semantic.color.bg.neutral["a=4"],

        backgroundColor: "transparent",

        transition: theme.transitions.create(["background-color", "border"], {
          duration: theme.transitions.duration.short,
        }),

        ".MuiSwitch-root > .Mui-checked + &": {
          opacity: 1,
          backgroundColor: theme.semantic.color.bg[color]["a=1"],
          borderColor: "transparent",
        },

        ".MuiSwitch-root > .Mui-disabled + &": {
          opacity: 1,
          borderColor: theme.semantic.color.bg.neutral["o=4"],
        },

        ".MuiSwitch-root > .Mui-checked.Mui-disabled + &": {
          opacity: 1,
          borderColor: "transparent",
          backgroundColor: theme.semantic.color.bg.neutral["l=4"],
        },
      };
    },
    thumb: ({ theme }) => {
      const size = theme.semantic.size["2xs"];

      return {
        width: size,
        height: size,
        borderRadius: theme.semantic.shape.radius.full,
        boxShadow: "none",
        backgroundColor: theme.semantic.color.bg.neutral["a=4"],

        ".MuiSwitch-root > .Mui-checked > &": {
          backgroundColor: theme.semantic.color.bg.neutral["l=1"],
        },

        ".MuiSwitch-root > .Mui-disabled > &": {
          backgroundColor: theme.semantic.color.bg.neutral["o=4"],
        },
      };
    },
    switchBase: ({ theme, ownerState }) => {
      const color = ownerState.color!;

      const haloSize = theme.semantic.size.xl;
      const shiftSize = `calc(${theme.semantic.size["4xl"]} - ${theme.semantic.size["2xs"]} - ${theme.semantic.space.sm} * 2)`;

      return {
        padding: theme.semantic.space.sm,
        backgroundColor: "transparent",

        "&:before": {
          content: '""',
          position: "absolute",
          width: haloSize,
          height: haloSize,
          borderRadius: theme.semantic.shape.radius.full,
          transform: "scale(0)",
          transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
          }),
          zIndex: -1,
        },

        "&:has(input:checked)": {
          transform: `translateX(${shiftSize})`,
        },

        "& > input": {
          marginLeft: "100%",
          maxWidth: theme.semantic.size["4xl"],

          "&:checked": {
            marginLeft: "30%",
            right: 0,
          },
        },

        "&:hover": {
          backgroundColor: "transparent",
        },
        "&:hover:before": {
          transform: "scale(1)",
          backgroundColor: theme.semantic.color.bg.neutral["o=3"],
        },
        "&:active:before": {
          transform: "scale(1)",
          backgroundColor: theme.semantic.color.bg.neutral["o=4"],
        },
        "&:has(input:focus-visible):before": {
          transform: "scale(1)",
          backgroundColor: theme.semantic.color.bg.neutral["o=3"],
        },

        "&:has(input:checked):hover:before": {
          backgroundColor: theme.semantic.color.bg[color][color === "neutral" ? "o=3" : "o=2"],
        },
        "&:has(input:checked):active:before": {
          backgroundColor: theme.semantic.color.bg[color][color === "neutral" ? "o=3" : "o=2"],
        },
        "&:has(input:checked:focus-visible):before": {
          backgroundColor: theme.semantic.color.bg[color][color === "neutral" ? "o=3" : "o=2"],
        },
      };
    },
  },
};
