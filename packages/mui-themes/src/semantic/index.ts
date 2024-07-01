import tokens from "@3jane/design-tokens/dist/tokens.json";

export const semantic = {
  color: {
    bg: {
      neutral: {
        "l=1": "#ffffff",
        "l=2": "#f6f6f8",
        "l=3": "#f0f1f3",
        "l=4": "#e6e8ed",
        "a=1": "#191c22",
        "a=2": "#22262e",
        "a=3": "#2c313b",
        "a=4": "#363c48",
        "o=1": "rgba(255, 255, 255, 80%)",
        "o=2": "rgba(148, 159, 181, 10%)",
        "o=3": "rgba(148, 159, 181, 15%)",
        "o=4": "rgba(148, 159, 181, 20%)",
      },
      brand: {
        "l=1": "#f7f6fb",
        "a=1": "#505fe0",
        "a=2": "#3e53d3",
        "a=3": "#3548ba",
        "o=1": "rgba(169, 165, 238, 10%)",
        "o=2": "rgba(169, 165, 238, 15%)",
        "o=3": "rgba(169, 165, 238, 30%)",
        "o=4": "rgba(169, 165, 238, 30%)",
      },
      error: {
        "l=1": "#fcf5f3",
        "a=1": "#e32222",
        "a=2": "#cd1e1e",
        "a=3": "#ba1a1a",
        "o=1": "rgba(250, 139, 115, 10%)",
        "o=2": "rgba(250, 139, 115, 15%)",
        "o=3": "rgba(250, 139, 115, 30%)",
        "o=4": "rgba(250, 139, 115, 30%)",
      },
      success: {
        "l=1": "#e5fceb",
        "a=1": "#09854a",
        "o=1": "rgba(17, 196, 112, 10%)",
      },
    },
    border: {
      neutral: {
        "l=1": "#ffffff",
        "a=1": "#191c22",
        "o=1": "rgba(148, 159, 181, 15%)",
        "o=2": "rgba(148, 159, 181, 30%)",
      },
      brand: {
        "a=1": "#505fe0",
        "o=1": "rgba(169, 165, 238, 60%)",
      },
      error: {
        "a=1": "#e32222",
        "o=1": "rgba(250, 139, 115, 60%)",
      },
    },
    text: {
      neutral: {
        "l=1": "#ffffff",
        "l=2": "#e6e8ed",
        "l=3": "#d1d5de",
        "l=4": "#c1c7d3",
        "a=1": "#191c22",
        "a=2": "#2c313b",
        "a=3": "#404755",
        "a=4": "#565f71",
      },
      brand: {
        "l=1": "#a9a5ee",
        "l=2": "#8988e8",
        "a=1": "#505fe0",
        "a=2": "#656de3",
      },
      error: {
        "l=1": "#fa8b73",
        "l=2": "#f9735d",
        "a=1": "#e32222",
        "a=2": "#f82e2a",
      },
      disabled: {
        "a=1": "#949fb5",
        "l=1": "#949fb5",
      },
    },
  },

  shape: {
    border: {
      none: "none",
      xs: "0.5px",
      sm: "1px",
      md: "1.5px",
      lg: "2px",
      xl: "3px",
      "2xl": "4px",
    },
    radius: {
      none: "none",
      "2xs": "2px",
      xs: "4px",
      sm: "6px",
      md: "8px",
      lg: "10px",
      xl: "12px",
      "2xl": "16px",
      "3xl": "20px",
      full: "9999px",
    },
    outline: {
      none: "none",
      sm: "4px",
      md: "4px",
      lg: "4px",
    },
  },

  size: {
    "6xs": "6px",
    "5xs": "8px",
    "4xs": "12px",
    "3xs": "16px",
    "2xs": "20px",
    xs: "24px",
    sm: "28px",
    md: "32px",
    lg: "36px",
    xl: "40px",
    "2xl": "44px",
    "3xl": "48px",
    "4xl": "56px",
    "5xl": "64px",
    "6xl": "72px",
  },

  space: {
    "-4xl": "-24px",
    "-3xl": "-20px",
    "-2xl": "-16px",
    "-xl": "-12px",
    "-lg": "-10px",
    "-md": "-8px",
    "-sm": "-6px",
    "-xs": "-4px",
    "-2xs": "-2px",
    "-3xs": "-1px",
    none: "0px",
    "3xs": "1px",
    "2xs": "2px",
    xs: "4px",
    sm: "6px",
    md: "8px",
    lg: "10px",
    xl: "12px",
    "2xl": "16px",
    "3xl": "20px",
    "4xl": "24px",
  },

  shadow: {
    outer: {
      none: "none",
      xs: "0 1px 3px 0 rgba(34, 38, 46, 0.08)",
      sm: "0 2px 4px 0 rgba(34, 38, 46, 0.08), 0 1px 3px 0 rgba(34, 38, 46, 0.06)",
      md: "0 4px 8px -1px rgba(34, 38, 46, 0.08), 0 2px 4px -1px rgba(34, 38, 46, 0.06)",
      lg: "0 8px 12px -4px rgba(34, 38, 46, 0.08), 0 6px 8px -4px rgba(34, 38, 46, 0.06)",
      xl: "0 12px 18px -6px rgba(34, 38, 46, 0.08), 0 8px 12px -6px rgba(34, 38, 46, 0.06)",
      "2xl":
        "0 20px 40px -10px rgba(34, 38, 46, 0.1), 0 10px 20px -10px rgba(34, 38, 46, 0.08)",
    },
    inner: {
      none: "none",
      xs: "none",
      sm: "inset 0 1px 0 0 rgba(255, 255, 255, 0.20), inset 0 -1px 0 0 rgba(0, 0, 0, 0.15)",
      md: "inset 0 2px 0 0 rgba(255, 255, 255, 0.20), inset 0 -2px 0 0 rgba(0, 0, 0, 0.15)",
      lg: "inset 0 4px 0 0 rgba(255, 255, 255, 0.20), inset 0 -4px 0 0 rgba(0, 0, 0, 0.15)",
      xl: "inset 0 4px 0 0 rgba(255, 255, 255, 0.20), inset 0 -4px 0 0 rgba(0, 0, 0, 0.15)",
      "2xl":
        "inset 0 4px 0 0 rgba(255, 255, 255, 0.20), inset 0 -4px 0 0 rgba(0, 0, 0, 0.15)",
    },
  },

  typography: {
    default: {
      htmlFontSize: 16,
      fontFamily: '"DM Sans", sans-serif',
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
    },

    display: {
      sm: {
        thin: {
          fontWeight: 400,
          fontSize: 36,
          lineHeight: 1.25,
        },
        medium: {
          fontWeight: 500,
          fontSize: 36,
          lineHeight: 1.25,
        },
        thick: {
          fontWeight: 700,
          fontSize: 36,
          lineHeight: 1.25,
        },
      },
      md: {
        thin: {
          fontWeight: 400,
          fontSize: 48,
          lineHeight: 1.25,
        },
        medium: {
          fontWeight: 500,
          fontSize: 48,
          lineHeight: 1.25,
        },
        thick: {
          fontWeight: 700,
          fontSize: 48,
          lineHeight: 1.25,
        },
      },
      lg: {
        thin: {
          fontWeight: 400,
          fontSize: 60,
          lineHeight: 1.25,
        },
        medium: {
          fontWeight: 500,
          fontSize: 60,
          lineHeight: 1.25,
        },
        thick: {
          fontWeight: 700,
          fontSize: 60,
          lineHeight: 1.25,
        },
      },
    },
    title: {
      sm: {
        thin: {
          fontWeight: 400,
          fontSize: 20,
          lineHeight: 1.25,
        },
        medium: {
          fontWeight: 500,
          fontSize: 20,
          lineHeight: 1.25,
        },
        thick: {
          fontWeight: 700,
          fontSize: 20,
          lineHeight: 1.25,
        },
      },
      md: {
        thin: {
          fontWeight: 400,
          fontSize: 24,
          lineHeight: 1.25,
        },
        medium: {
          fontWeight: 500,
          fontSize: 24,
          lineHeight: 1.25,
        },
        thick: {
          fontWeight: 700,
          fontSize: 24,
          lineHeight: 1.25,
        },
      },
      lg: {
        thin: {
          fontWeight: 400,
          fontSize: 28,
          lineHeight: 1.25,
        },
        medium: {
          fontWeight: 500,
          fontSize: 28,
          lineHeight: 1.25,
        },
        thick: {
          fontWeight: 700,
          fontSize: 28,
          lineHeight: 1.25,
        },
      },
    },
    body: {
      sm: {
        thin: {
          fontWeight: 400,
          fontSize: 12,
          lineHeight: 1.6,
        },
        medium: {
          fontWeight: 500,
          fontSize: 12,
          lineHeight: 1.6,
        },
        thick: {
          fontWeight: 700,
          fontSize: 12,
          lineHeight: 1.6,
        },
      },
      md: {
        thin: {
          fontWeight: 400,
          fontSize: 14,
          lineHeight: 1.6,
        },
        medium: {
          fontWeight: 500,
          fontSize: 14,
          lineHeight: 1.6,
        },
        thick: {
          fontWeight: 700,
          fontSize: 14,
          lineHeight: 1.6,
        },
      },
      lg: {
        thin: {
          fontWeight: 400,
          fontSize: 16,
          lineHeight: 1.6,
        },
        medium: {
          fontWeight: 500,
          fontSize: 16,
          lineHeight: 1.6,
        },
        thick: {
          fontWeight: 700,
          fontSize: 16,
          lineHeight: 1.6,
        },
      },
    },
    label: {
      sm: {
        thin: {
          fontWeight: 400,
          fontSize: 10,
          lineHeight: 1.25,
        },
        medium: {
          fontWeight: 500,
          fontSize: 10,
          lineHeight: 1.25,
        },
        thick: {
          fontWeight: 700,
          fontSize: 10,
          lineHeight: 1.25,
        },
      },
      md: {
        thin: {
          fontWeight: 400,
          fontSize: 12,
          lineHeight: 1.25,
        },
        medium: {
          fontWeight: 500,
          fontSize: 12,
          lineHeight: 1.25,
        },
        thick: {
          fontWeight: 700,
          fontSize: 12,
          lineHeight: 1.25,
        },
      },
      lg: {
        thin: {
          fontWeight: 400,
          fontSize: 14,
          lineHeight: 1.25,
        },
        medium: {
          fontWeight: 500,
          fontSize: 14,
          lineHeight: 1.25,
        },
        thick: {
          fontWeight: 700,
          fontSize: 14,
          lineHeight: 1.25,
        },
      },
    },
  },
};

export type Semantic = typeof semantic;
