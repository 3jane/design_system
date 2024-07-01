import type { Components, Theme } from "@mui/material";

declare module "@mui/material" {
  interface BadgePropsVariantOverrides {}
  interface BadgePropsColorOverrides {
    brand: true;
    neutral: true;
  }
  interface BadgeRootSlotPropsOverrides {}
  interface BadgeBadgeSlotPropsOverrides {}
  interface BadgeOwnProps {}
}

export const MuiBadge: Components<Omit<Theme, "components">>["MuiBadge"] = {
  defaultProps: {},
  styleOverrides: {
    badge: ({ theme, ownerState }) => {
      const font = theme.semantic.typography.label.lg.thick;
      const backgroundColor = theme.semantic.color.bg[ownerState.color as "neutral" | "brand"]["a=1"];
      const color = theme.semantic.color.text.neutral["l=1"];

      return {
        ...font,
        boxShadow: theme.semantic.shadow.inner.sm,
        paddingInline: theme.semantic.space["2xs"],
        backgroundColor,
        color,

        "&.MuiBadge-anchorOriginBottomRight": {
          bottom: "12%",
          right: "12%",
        },
        "&.MuiBadge-anchorOriginBottomLeft": {
          bottom: "12%",
          left: "12%",
        },
        "&.MuiBadge-anchorOriginTopRight": {
          top: "12%",
          right: "12%",
        },
        "&.MuiBadge-anchorOriginTopLeft": {
          top: "12%",
          left: "12%",
        },

        variants: [
          {
            props: { variant: "standard" },
            style: {
              height: theme.semantic.size["2xs"],
              minWidth: theme.semantic.size["2xs"],
            },
          },
          {
            props: { variant: "dot" },
            style: {
              height: theme.semantic.size["5xs"],
              minWidth: theme.semantic.size["5xs"],
            },
          },
        ],
      };
    },
  },
};
