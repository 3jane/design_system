import type { Components, Theme } from "@mui/material";

declare module "@mui/material" {
  interface TypographyPropsVariantOverrides {
    h1: false;
    h2: false;
    h3: false;
    h4: false;
    h5: false;
    h6: false;
    subtitle1: false;
    subtitle2: false;
    body1: false;
    body2: false;
    caption: false;
    button: false;
    overline: false;

    display: true;
    title: true;
    body: true;
    label: true;
  }

  /* It used for styleOverrides keys */
  interface TypographyClasses {
    display: string;
    title: string;
    body: string;
    label: string;
  }

  interface TypographyOwnProps {
    size?: "sm" | "md" | "lg";
    thickness?: "thin" | "medium" | "thick";
  }
}

export const MuiTypography: Components<Omit<Theme, "components">>["MuiTypography"] = {
  defaultProps: {
    variantMapping: {
      display: "p",
      title: "p",
      body: "p",
      label: "label",
    },
    variant: "body",
    size: "md",
    thickness: "medium",
  },
  styleOverrides: {
    root: ({ theme, ownerState }) => {
      if (ownerState.variant === "inherit") {
        return {};
      }

      const { fontWeight, fontSize, lineHeight } =
        theme.semantic.typography[ownerState.variant!][ownerState.size!][ownerState.thickness!];

      return {
        fontWeight,
        fontSize,
        lineHeight,
      };
    },
  },
};
