import type { Components, Theme } from "@mui/material";

declare module "@mui/material" {}

export const MuiListItem: Components<Omit<Theme, "components">>["MuiListItem"] = {
  defaultProps: {},
  styleOverrides: {
    root: ({ theme, ownerState }) => {
      return {
        paddingInline: !ownerState.disablePadding ? theme.semantic.space["2xl"] : undefined,
        paddingBlock: !ownerState.disablePadding ? theme.semantic.space["lg"] : undefined,
        gap: theme.semantic.space["md"],

        borderWidth: theme.semantic.shape.border.sm,
        minHeight: theme.semantic.size["2xl"],
      };
    },
  },
};

export const MuiListItemButton: Components<Omit<Theme, "components">>["MuiListItemButton"] = {
  defaultProps: {
    disableRipple: true,
  },
  styleOverrides: {
    root: ({ theme, ownerState }) => {
      const selected = ownerState.selected;

      return {
        paddingInline: theme.semantic.space["2xl"],
        paddingBlock: theme.semantic.space["lg"],
        gap: theme.semantic.space["md"],

        borderWidth: theme.semantic.shape.border.sm,
        minHeight: theme.semantic.size["2xl"],

        backgroundColor: selected ? theme.semantic.color.bg.brand["o=1"] : "transparent",

        "&:hover": {
          backgroundColor: theme.semantic.color.bg[selected ? "brand" : "neutral"]["o=2"],
        },

        "&:focus-visible": {
          backgroundColor: theme.semantic.color.bg[selected ? "brand" : "neutral"]["o=2"],
        },
      };
    },
  },
};

export const MuiListItemText: Components<Omit<Theme, "components">>["MuiListItemText"] = {
  defaultProps: {
    primaryTypographyProps: { variant: "label", size: "lg", thickness: "medium", component: "span" },
    secondaryTypographyProps: { variant: "body", size: "sm", thickness: "thin" },
  },
  styleOverrides: {
    root: ({ theme }) => ({
      margin: 0,
      gap: theme.semantic.space["2xs"],
      display: "flex",
      flexDirection: "column",

      "& .MuiListItemText-primary": {
        color: theme.semantic.color.text.neutral["a=2"],
      },
      "& .MuiListItemText-secondary": {
        color: theme.semantic.color.text.neutral["a=4"],
      },
    }),
  },
};

export const MuiListItemAvatar: Components<Omit<Theme, "components">>["MuiListItemAvatar"] = {
  defaultProps: {},
  styleOverrides: {
    root: ({ theme }) => ({
      minWidth: "fit-content",
      marginBlock: theme.semantic.space["-sm"],
    }),
  },
};

export const MuiListItemIcon: Components<Omit<Theme, "components">>["MuiListItemIcon"] = {
  defaultProps: {},
  styleOverrides: {
    root: ({ theme }) => ({
      minWidth: "fit-content",
      marginBlock: theme.semantic.space["-sm"],
    }),
  },
};
