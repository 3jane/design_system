import type { Components, Theme } from "@mui/material";

declare module "@mui/material" {
  interface IconButtonPropsColorOverrides {
    primary: false;
    secondary: false;
    success: false;
    info: false;
    warning: false;
    default: false;

    brand: true;
    neutral: true;
    error: true;
  }

  interface IconButtonPropsSizeOverrides {
    small: false;
    medium: false;
    large: false;

    sm: true;
    md: true;
    lg: true;
  }

  interface IconButtonOwnProps {
    variant?: "elevated" | "filled" | "tonal" | "outlined" | "text";
  }
}

export const MuiIconButton: Components<Omit<Theme, "components">>["MuiIconButton"] = {
  defaultProps: {
    disableRipple: true,
    size: "md",
    color: "neutral",
  },
  styleOverrides: {
    root: ({ theme, ownerState }) => {
      const color = ownerState.color!;
      const size = ownerState.size!;
      const disabled = ownerState.disabled;

      const common = {
        ...theme.semantic.typography.label["lg"]["thick"],
        borderRadius: theme.semantic.shape.radius.lg,
        textTransform: "none",
        outlineWidth: 0,
        transition: theme.transitions.create(
          ["box-shadow", "background-color", "border-color", "color", "outline-width"],
          {
            duration: theme.transitions.duration.short,
          }
        ),

        paddingInline: theme.semantic.space.md,
        paddingBlock: theme.semantic.space.md,

        // FIXME: Rework as we work with sizes
        minHeight:
          size === "sm" ? theme.semantic.size.lg : size === "md" ? theme.semantic.size.xl : theme.semantic.size["3xl"],
        minWidth:
          size === "sm" ? theme.semantic.size.lg : size === "md" ? theme.semantic.size.xl : theme.semantic.size["3xl"],

        "& .MuiSvgIcon-root": {
          fontSize: theme.semantic.size["2xs"],
        },
      } as const;

      if (color === "inherit") {
        return common;
      }

      return {
        ...common,

        variants: [
          {
            props: { variant: "elevated" },
            style: {
              borderStyle: "solid",
              borderWidth: theme.semantic.shape.border.sm,
              backgroundColor: theme.semantic.color.bg["neutral"]["l=1"],
              borderColor: theme.semantic.color.border[color]["o=1"],
              color: theme.semantic.color.text[color]["a=1"],
              boxShadow: theme.semantic.shadow.outer.xs,

              "&.Mui-disabled": {
                backgroundColor: theme.semantic.color.bg["neutral"]["l=3"],
                borderColor: theme.semantic.color.border["neutral"]["o=1"],
                color: theme.semantic.color.text["disabled"]["l=1"],
              },

              "&:hover": {
                boxShadow: theme.semantic.shadow.outer.sm,
                backgroundColor: theme.semantic.color.bg["neutral"]["l=1"],
              },
              "&:active": {
                boxShadow: theme.semantic.shadow.outer.xs,
                backgroundColor: theme.semantic.color.bg["neutral"]["l=1"],
              },
              "&:focus-visible": {
                boxShadow: theme.semantic.shadow.outer.none,
                /* THINK: Outline should be use current color? */
                outlineWidth: theme.semantic.shape.outline.sm,
                outlineStyle: "solid",
                outlineColor: theme.semantic.color.bg["brand"]["o=3"],
              },
            },
          },
          {
            props: { variant: "filled" },
            style: {
              backgroundColor: theme.semantic.color.bg[color]["a=1"],
              color: theme.semantic.color.text["neutral"]["l=1"],
              boxShadow: theme.semantic.shadow.inner.md,

              "&.Mui-disabled": {
                backgroundColor: theme.semantic.color.bg["neutral"]["l=3"],
                color: theme.semantic.color.text["disabled"]["l=1"],
              },

              "&:hover": {
                backgroundColor: theme.semantic.color.bg[color]["a=2"],
              },
              "&:active": {
                backgroundColor: theme.semantic.color.bg[color]["a=3"],
              },
              "&:focus-visible": {
                outlineWidth: theme.semantic.shape.outline.sm,
                outlineStyle: "solid",
                outlineColor: theme.semantic.color.bg["brand"]["o=3"],
              },
            },
          },
          {
            props: { variant: "tonal" },
            style: {
              backgroundColor: theme.semantic.color.bg[color][color === "neutral" ? "o=2" : "o=1"],
              color: theme.semantic.color.text[color]["a=1"],

              "&.Mui-disabled": {
                backgroundColor: theme.semantic.color.bg["neutral"]["o=3"],
                color: theme.semantic.color.text["disabled"]["l=1"],
              },

              "&:hover": {
                backgroundColor: theme.semantic.color.bg[color][color === "neutral" ? "o=3" : "o=2"],
              },
              "&:active": {
                backgroundColor: theme.semantic.color.bg[color][color === "neutral" ? "o=4" : "o=3"],
              },
              "&:focus-visible": {
                boxShadow: theme.semantic.shadow.outer.none,
                /* THINK: Outline should be use current color? */
                outlineWidth: theme.semantic.shape.outline.sm,
                outlineStyle: "solid",
                outlineColor: theme.semantic.color.bg["brand"]["o=3"],
              },
            },
          },
          {
            props: { variant: "outlined" },
            style: {
              borderStyle: "solid",
              borderWidth: theme.semantic.shape.border.sm,
              borderColor: theme.semantic.color.border[color]["o=1"],
              color: disabled ? theme.semantic.color.text["disabled"]["l=1"] : theme.semantic.color.text[color]["a=1"],
              boxShadow: theme.semantic.shadow.outer.xs,

              "&.Mui-disabled": {
                borderColor: theme.semantic.color.border["neutral"]["o=1"],
                color: theme.semantic.color.text["disabled"]["l=1"],
              },

              "&:hover": {
                backgroundColor: theme.semantic.color.bg[color][color === "neutral" ? "o=2" : "o=1"],
                borderColor: theme.semantic.color.border[color]["o=1"],
              },
              "&:active": {
                backgroundColor: theme.semantic.color.bg[color][color === "neutral" ? "o=3" : "o=2"],
                borderColor: theme.semantic.color.border[color]["o=1"],
              },
              "&:focus-visible": {
                /* THINK: Outline should be use current color? */
                outlineWidth: theme.semantic.shape.outline.sm,
                outlineStyle: "solid",
                outlineColor: theme.semantic.color.bg["brand"]["o=3"],
              },
            },
          },
          {
            props: { variant: "text" },
            style: {
              color: theme.semantic.color.text[color]["a=1"],

              "&.Mui-disabled": {
                color: theme.semantic.color.text["disabled"]["l=1"],
              },

              "&:hover": {
                backgroundColor: theme.semantic.color.bg[color][color === "neutral" ? "o=2" : "o=1"],
              },
              "&:active": {
                backgroundColor: theme.semantic.color.bg[color][color === "neutral" ? "o=3" : "o=2"],
              },
              "&:focus-visible": {
                /* THINK: Outline should be use current color? */
                outlineWidth: theme.semantic.shape.outline.sm,
                outlineStyle: "solid",
                outlineColor: theme.semantic.color.bg["brand"]["o=3"],
              },
            },
          },
        ],
      };
    },
  },
};
