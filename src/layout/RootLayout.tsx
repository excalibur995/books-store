import { ReactNode } from "react";
import { styled } from "stitches.config";

type RootLayoutProps = { children: ReactNode };

const Wrapper = styled("div", {
  flexing: "column",
  justifyContent: "flex-start",
  minHeight: "100vh",
  padding: "$54 0",
  "@bp1": {
    maxWidth: "90rem",
    margin: "0 auto",
  },
});

const RootLayout = ({ children }: RootLayoutProps) => {
  return <Wrapper>{children}</Wrapper>;
};

export default RootLayout;
