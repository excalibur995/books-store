import React, { ComponentPropsWithoutRef } from "react";
import { styled } from "stitches.config";
import { CSS } from "@stitches/react";

interface TypoProps extends ComponentPropsWithoutRef<"span"> {
  variant?:
    | "hero"
    | "heading"
    | "subheading"
    | "title"
    | "regular"
    | "paragraph"
    | "caption"
    | "micro"
    | "big-button"
    | "small-button"
    | "link-button";
  weight?: "bold" | "semibold" | "regular";
  css?: CSS;
  isGrey?: boolean;
  children: React.ReactNode;
}

const StyledTypography = styled("span", {
  margin: "0 !important",
  color: "$N80",
  variants: {
    isGrey: {
      true: {
        color: "$N30",
      },
    },
    variant: {
      hero: {
        remFont: 36,
        lineHeight: "48px",
      },
      heading: {
        remFont: 24,
        lineHeight: "36px",
      },
      subheading: {
        remFont: 20,
        lineHeight: "28px",
      },
      title: {
        remFont: 16 / 1.25,
        lineHeight: "12px",
        "@bp1": {
          remFont: 16,
          lineHeight: "24px",
        },
      },
      regular: {
        remFont: 15,
        lineHeight: "20px",
      },
      paragraph: {
        remFont: 14,
        lineHeight: "20px",
      },
      caption: {
        remFont: 12,
        lineHeight: "16px",
      },
      micro: {
        remFont: 10.5,
        lineHeight: "14px",
      },
      "big-button": {
        remFont: 14,
        lineHeight: "20px",
        fontWeight: "700 !important",
      },
      "small-button": {
        remFont: 12,
        lineHeight: "16px",
        fontWeight: "700 !important",
      },
      "link-button": {
        remFont: 14,
        lineHeight: "20px",
        letterSpacing: "-2% !important",
      },
    },
    weight: {
      bold: {
        fontWeight: 800,
        letterSpacing: "-2%",
      },
      semibold: {
        fontWeight: 600,
        letterSpacing: "-1.5%",
      },
      regular: {
        fontWeight: 400,
        letterSpacing: "-0.5%",
      },
    },
  },
  defaultVariants: {
    variant: "regular",
    weight: "regular",
  },
});

const Typography = ({ children, ...rest }: TypoProps) => {
  return <StyledTypography {...rest}>{children}</StyledTypography>;
};

Typography.defaultProps = {
  variant: "regular",
  weight: "regular",
};
export default Typography;
