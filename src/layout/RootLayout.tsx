import { ReactNode } from "react";
import { styled } from "stitches.config";

type RootLayoutProps = { children: ReactNode };

const Wrapper = styled("div", {
  padding: "0",
  flexing: "column",
  justifyContent: "flex-start",
  minHeight: "100vh",
  "@bp1": {
    maxWidth: "90rem",
    padding: "$64 0",
    margin: "0 auto",
  },
});

const RootLayout = ({ children }: RootLayoutProps) => {
  return <Wrapper>{children}</Wrapper>;
};

export default RootLayout;
