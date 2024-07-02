import type { Components, Theme } from "@mui/material";

declare module "@mui/material" {
  interface AvatarPropsVariantOverrides {
    square: false;
  }
  interface AvatarOwnProps {
    size?: "xs" | "sm" | "md" | "lg" | "xl";
  }
}

const fontStyles = {
  xs: (theme: Omit<Theme, "components">) => theme.semantic.typography.label.sm.medium,
  sm: (theme: Omit<Theme, "components">) => theme.semantic.typography.label.md.medium,
  md: (theme: Omit<Theme, "components">) => theme.semantic.typography.label.lg.medium,
  lg: (theme: Omit<Theme, "components">) => theme.semantic.typography.title.sm.thin,
  xl: (theme: Omit<Theme, "components">) => theme.semantic.typography.title.md.thin,
};

const ownSize = {
  xs: (theme: Omit<Theme, "components">) => theme.semantic.size["xs"],
  sm: (theme: Omit<Theme, "components">) => theme.semantic.size["md"],
  md: (theme: Omit<Theme, "components">) => theme.semantic.size["xl"],
  lg: (theme: Omit<Theme, "components">) => theme.semantic.size["4xl"],
  xl: (theme: Omit<Theme, "components">) => theme.semantic.size["5xl"],
};

export const MuiAvatar: Components<Omit<Theme, "components">>["MuiAvatar"] = {
  defaultProps: {
    size: "md",
  },
  styleOverrides: {
    root: ({ theme, ownerState }) => {
      const font = fontStyles[ownerState.size!](theme);
      const size = ownSize[ownerState.size!](theme);

      return {
        ...font,
        width: size,
        height: size,

        backgroundColor: theme.semantic.color.bg.neutral["o=2"],
        borderColor: theme.semantic.color.border.neutral["l=1"],
        color: theme.semantic.color.text.neutral["a=3"],

        borderWidth: theme.semantic.shape.border.md,
        borderStyle: "solid",

        variants: [
          {
            props: { variant: "circular" },
            style: {
              borderRadius: theme.semantic.shape.radius.full,
            },
          },
          {
            props: { variant: "rounded" },
            style: {
              borderRadius: theme.semantic.shape.radius[ownerState.size!],
            },
          },
        ],
      };
    },
  },
};
