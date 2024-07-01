import type { Components, Theme } from "@mui/material";

declare module "@mui/material" {
  interface TextFieldPropsColorOverrides {
    primary: false;
    secondary: false;
    success: false;
    info: false;
    warning: false;

    neutral: true;
    error: true;
  }
  interface TextFieldPropsSizeOverrides {}
}

export const MuiTextField: Components<Omit<Theme, "components">>["MuiTextField"] = {
  defaultProps: {
    InputLabelProps: {
      shrink: true,
    },
  },
  styleOverrides: {
    root: ({ theme, ownerState }) => {
      const color = ownerState.color!;
      const disabled = ownerState.disabled;

      const borderColorKey = color === "error" ? "error" : "neutral";
      const outlineColorKey = color === "error" ? "error" : "brand";

      return {
        "& .MuiInputBase-root": {
          borderRadius: theme.semantic.shape.radius.md,
          boxShadow: theme.semantic.shadow.outer.xs,
          color: theme.semantic.color.text.neutral["a=4"],

          "& input": {
            ...theme.semantic.typography.label.lg.thin,
            paddingBlock: 0,
            paddingInline: theme.semantic.space.xl,
            minHeight: theme.semantic.size.xl,
            outline: "none",
          },

          "& fieldset ": {
            top: 0,
            borderWidth: theme.semantic.shape.border.sm,
            borderColor: theme.semantic.color.border[borderColorKey]["o=1"],
            backgroundColor: disabled ? theme.semantic.color.bg.neutral["o=3"] : undefined,

            "& legend": {
              display: "none",
            },
          },

          "&:hover": {
            color: theme.semantic.color.text.neutral["a=4"],

            "& fieldset": {
              borderColor: theme.semantic.color.border[borderColorKey]["o=1"],
            },
          },

          "&:has(input:focus-visible)": {
            boxShadow: theme.semantic.shadow.outer.xs,
            outlineWidth: theme.semantic.shape.outline.sm,
            outlineStyle: "solid",
            outlineColor: theme.semantic.color.bg[outlineColorKey]["o=3"],

            color: theme.semantic.color.text.neutral["a=2"],
          },

          "&.Mui-focused": {
            "& fieldset": {
              borderColor: theme.semantic.color.border[outlineColorKey]["o=1"],
            },
          },

          "&.Mui-disabled": {
            "& input": {
              color: theme.semantic.color.text.disabled["l=1"],
            },

            "& fieldset": {
              borderColor: theme.semantic.color.border.neutral["o=1"],
            },
          },
        },

        "& .MuiInputLabel-root": {
          ...theme.semantic.typography.label.md.medium,
          position: "relative",
          transform: "none",
          marginBottom: theme.semantic.space.sm,
          color: theme.semantic.color.text.neutral["a=2"],

          "&.Mui-focused": {
            color: theme.semantic.color.text.neutral["a=2"],
          },
        },

        "& .MuiFormHelperText-root": {
          ...theme.semantic.typography.label.md.thin,
          margin: 0,
          marginTop: theme.semantic.space.sm,
          color: theme.semantic.color.text.neutral["a=4"],
        },
      };
    },
  },
};
