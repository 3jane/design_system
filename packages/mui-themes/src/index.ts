import { createTheme } from "@mui/material";

import { components } from "./components";
import { semantic, Semantic } from "./semantic";

declare module "@mui/material" {
  interface Theme {
    semantic: Semantic;
  }

  interface Palette {
    brand: Palette["primary"];
    neutral: Palette["primary"];
  }

  interface ThemeOptions {
    semantic?: Partial<Semantic>;
  }

  interface PaletteOptions {
    brand?: PaletteOptions["primary"];
    neutral?: PaletteOptions["primary"];
  }
}

export const lightTheme = createTheme({
  semantic,
  components,
  palette: {
    mode: "light",
    brand: { main: "#000000" },
    neutral: { main: "#000000" },
  },
  typography: semantic.typography.default,
});

export const darkTheme = createTheme({
  semantic,
  components,
  palette: {
    mode: "dark",
    action: {
      disabledOpacity: 1,
    },
  },
  typography: semantic.typography.default,
});
