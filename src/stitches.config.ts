import { createStitches } from "@stitches/react";

const spacingSet = [0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 64] as const;

export function calcSpaces(spaces: number) {
  return `${spaces / 16}rem`;
}

type SpacingKey = typeof spacingSet[number];
const spaces: Record<SpacingKey, string> = (() => {
  const spacing = new Map();
  spacingSet.forEach((space) => {
    spacing.set(space, calcSpaces(space));
  });
  return Object.fromEntries(spacing);
})();

export const { styled, css, createTheme, keyframes, globalCss, getCssText } =
  createStitches({
    utils: {
      mx: (value: string | number) => ({
        marginLeft: value,
        marginRight: value,
      }),
      my: (value: string | number) => ({
        marginTop: value,
        marginBottom: value,
      }),
      px: (value: string | number) => ({
        paddingRight: value,
        paddingLeft: value,
      }),
      py: (value: string | number) => ({
        paddingTop: value,
        paddingBottom: value,
      }),

      flexing: (dir: "column" | "row" | "row-center" | "column-center") => {
        if (dir.includes("-center")) {
          return {
            display: "flex",
            flexDirection: dir.substring(0, dir.indexOf("-")),
            alignItems: "center",
            justifyContent: "center",
          };
        }
        return {
          display: "flex",
          flexDirection: dir,
        };
      },
      gridCenter: () => ({
        display: "grid",
        placeContent: "center",
      }),
      equallyGridColumn: (column: number) => ({
        display: "grid",
        gridTemplateColumns: `repeat(${column}, minmax(0, 1fr))`,
      }),
      equallyGridRow: (row: number) => ({
        display: "grid",
        gridTemplateRows: `repeat(${row}, minmax(0, 1fr))`,
      }),
      remFont: (pixel: number) => ({
        fontSize: calcSpaces(pixel),
      }),
      size: (value: number | string) => ({
        width: value,
        height: value,
      }),
    },
    media: {
      bp1: "(min-width: 768px)",
      bp2: "(min-width: 1200px)",
    },
    theme: {
      colors: {
        primary: "hsl(266, 84%, 46%)",
        neutral: "hsl(0, 0%, 89%)",
        neutral_grey: "hsl(0, 0%, 70%)",
        neutral_dark: "hsl(0, 1%, 29%)",
      },
      space: spaces,
    },
  });
