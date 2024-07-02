import type { Components, Theme } from "@mui/material";

declare module "@mui/material" {
  interface ButtonPropsColorOverrides {
    primary: false;
    secondary: false;
    success: false;
    info: false;
    warning: false;

    brand: true;
    neutral: true;
    error: true;
  }

  interface ButtonPropsSizeOverrides {
    small: false;
    medium: false;
    large: false;

    sm: true;
    md: true;
    lg: true;
  }

  interface ButtonPropsVariantOverrides {
    contained: false;

    elevated: true;
    filled: true;
    tonal: true;
    outlined: true;
    text: true;
  }
}

export const MuiButton: Components<Omit<Theme, "components">>["MuiButton"] = {
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

        // FIXME: This is a fast decision, we need to think about this
        paddingInline: size === "sm" ? theme.semantic.space.xl : theme.semantic.space["2xl"],
        paddingBlock:
          size === "sm" ? theme.semantic.space.md : size === "md" ? theme.semantic.space.lg : theme.semantic.space.xl,
        // FIXME: Rework as we work with sizes
        minHeight:
          size === "sm" ? theme.semantic.size.lg : size === "md" ? theme.semantic.size.xl : theme.semantic.size["3xl"],
      } as const;

      if (color === "inherit") {
        return {
          ...common,
        };
      }

      return {
        ...common,

        variants: [
          {
            props: { variant: "elevated" },
            style: {
              borderStyle: "solid",
              borderWidth: theme.semantic.shape.border.sm,
              backgroundColor: disabled
                ? theme.semantic.color.bg["neutral"]["l=3"]
                : theme.semantic.color.bg["neutral"]["l=1"],
              borderColor: disabled
                ? theme.semantic.color.border["neutral"]["o=1"]
                : theme.semantic.color.border[color]["o=1"],
              color: disabled ? theme.semantic.color.text["disabled"]["l=1"] : theme.semantic.color.text[color]["a=1"],
              boxShadow: theme.semantic.shadow.outer.xs,

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
              backgroundColor: disabled
                ? theme.semantic.color.bg["neutral"]["l=3"]
                : theme.semantic.color.bg[color]["a=1"],
              color: disabled
                ? theme.semantic.color.text["disabled"]["l=1"]
                : theme.semantic.color.text["neutral"]["l=1"],
              boxShadow: theme.semantic.shadow.inner.md,

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
              backgroundColor: disabled
                ? theme.semantic.color.bg["neutral"]["o=3"]
                : theme.semantic.color.bg[color][color === "neutral" ? "o=2" : "o=1"],
              color: disabled ? theme.semantic.color.text["disabled"]["l=1"] : theme.semantic.color.text[color]["a=1"],

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
              color: disabled ? theme.semantic.color.text["disabled"]["l=1"] : theme.semantic.color.text[color]["a=1"],

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
