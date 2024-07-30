import { backdropClasses, type Components, type Theme } from "@mui/material";

declare module "@mui/material" {
  interface TabsPropsIndicatorColorOverrides {}

  interface TabsStartScrollButtonIconSlotPropsOverrides {}
  interface TabsEndScrollButtonIconSlotPropsOverrides {}

  interface TabsOwnProps {
    color?: "brand" | "neutral";
    kind?: "browser" | "underline" | "segment";
  }
  interface TabOwnProps {}
}

export const MuiTabs: Components<Omit<Theme, "components">>["MuiTabs"] = {
  defaultProps: {
    color: "brand",
  },
  styleOverrides: {
    root: ({ theme, ownerState }) => {
      const color = ownerState.color!;

      return {
        minHeight: "unset",

        "& .MuiTab-root.Mui-selected:hover": {
          backgroundColor: "initial",
        },

        variants: [
          {
            props: { kind: "underline" },
            style: {
              "& .MuiTab-root.Mui-selected": {
                color: theme.semantic.color.text[color]["a=1"],
              },

              "& .MuiTab-root.Mui-selected:focus-visible": {
                backgroundColor: theme.semantic.color.bg[color]["o=2"],
              },

              "& .MuiTab-root.Mui-disabled": {
                color: theme.semantic.color.text.disabled["l=1"],
              },

              "&:has(.MuiTab-root.Mui-disabled) .MuiTabs-indicator": {
                backgroundColor: "transparent",
              },
            },
          },
          {
            props: { kind: "browser" },
            style: {
              "& .MuiTab-root.Mui-selected": {
                color: theme.semantic.color.text["neutral"]["a=1"],
                backgroundColor: theme.semantic.color.bg.neutral["l=1"],

                "&:hover": {
                  backgroundColor: theme.semantic.color.bg.neutral["l=1"],
                },

                "&:focus-visible": {
                  backgroundColor: theme.semantic.color.bg.neutral["l=1"],
                },
              },

              "& .MuiTab-root.Mui-disabled": {
                color: theme.semantic.color.text.disabled["l=1"],
              },
            },
          },
          {
            props: { kind: "segment" },
            style: {
              maxWidth: "fit-content",
              borderRadius: theme.semantic.shape.radius.xl,
              backgroundColor: theme.semantic.color.bg.neutral["o=2"],

              "& .MuiTab-root": {
                borderRadius: theme.semantic.shape.radius.md,
                borderWidth: theme.semantic.shape.border.sm,
              },

              "& .MuiTab-root:focus-visible": {
                boxShadow: theme.semantic.shadow.outer.none,
                outlineWidth: theme.semantic.shape.outline.sm,
                outlineStyle: "solid",
                outlineColor: theme.semantic.color.bg["brand"]["o=3"],
                backgroundColor: theme.semantic.color.bg.neutral["l=1"],
              },

              "& .MuiTab-root.Mui-selected": {
                color: theme.semantic.color.text["neutral"]["a=1"],
              },

              "& .MuiTab-root.Mui-disabled": {
                color: theme.semantic.color.text.disabled["l=1"],
                backgroundColor: "transparent",
                boxShadow: theme.semantic.shadow.outer.none,
              },

              "&:has(.MuiTab-root.Mui-disabled) .MuiTabs-indicator": {
                backgroundColor: "transparent !important",
              },
            },
          },
        ],
      };
    },
    scroller: {
      overflowX: "auto !important" as "auto",
    },
    flexContainer: ({ theme }) => ({
      variants: [
        {
          props: { kind: "underline" },
          style: {
            gap: theme.semantic.space["xs"],
          },
        },
        {
          props: { kind: "browser" },
          style: {},
        },
        {
          props: { kind: "segment" },
          style: {
            padding: theme.semantic.space["xs"],
            gap: theme.semantic.space["xs"],
            zIndex: 1,
            position: "relative",
          },
        },
      ],
    }),
    indicator: ({ theme, ownerState }) => {
      const color = ownerState.color!;

      return {
        variants: [
          {
            props: { kind: "underline" },
            style: {
              height: theme.semantic.shape.border["md"],
              backgroundColor: theme.semantic.color.text[color]["a=1"],
            },
          },
          {
            props: { kind: "browser" },
            style: {
              display: "none",
            },
          },
          {
            props: { kind: "segment" },
            style: {
              height: theme.semantic.size["xl"],
              zIndex: 0,
              backgroundColor: "white",
              bottom: theme.semantic.space["xs"],
              borderRadius: theme.semantic.shape.radius.md,
              boxShadow: theme.semantic.shadow.outer.sm,
            },
          },
        ],
      };
    },
  },
};
export const MuiTab: Components<Omit<Theme, "components">>["MuiTab"] = {
  defaultProps: {
    disableRipple: true,
  },
  styleOverrides: {
    root: ({ theme, ownerState }) => {
      return {
        ...theme.semantic.typography.label.lg.thick,

        minHeight: "unset",
        maxWidth: "unset",
        minWidth: theme.semantic.size["2xl"],
        flexShrink: ownerState.selected ? 0 : 1,

        whiteSpace: "nowrap",
        justifyContent: "flex-start",
        textTransform: "none",

        paddingInline: theme.semantic.space["xl"], // TODO: review with Vadim
        paddingBlock: theme.semantic.space["lg"], // TODO: review with Vadim
        gap: theme.semantic.space["xl"], // TODO: review with Vadim

        color: theme.semantic.color.text.neutral["a=4"],

        transition: theme.transitions.create(["color", "background-color"], {
          duration: theme.transitions.duration.short,
        }),

        "&:hover": {
          backgroundColor: theme.semantic.color.bg.neutral["o=2"],
        },
        "&:focus-visible": {
          backgroundColor: theme.semantic.color.bg.neutral["o=2"],
        },
      };
    },
    iconWrapper: ({ theme }) => ({
      margin: 0,
      fontSize: theme.semantic.size["2xs"],
    }),
  },
};
