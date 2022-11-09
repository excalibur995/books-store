import React from "react";
import { Link } from "react-router-dom";
import { styled } from "stitches.config";

const HeaderWrapper = styled("header", {
  width: "100%",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 99,
  borderBottom: "1px solid $neutral",
});

const HeaderOuter = styled("section", {
  flexing: "column",
  justifyContent: "center",
  background: "$primary",
  height: 55,
});

const HeaderInner = styled("div", {
  maxWidth: 1440,
  flexing: "row",
  alignItems: "center",
  margin: "0 auto",
  size: "100%",
  padding: "$24",
  "*": { color: "$neutral" },
});

export interface HeaderProps {
  children: React.ReactNode;
  isUsingBackButton?: boolean;
  path?: string;
}

export const Header = ({ children }: HeaderProps) => {
  return (
    <>
      <HeaderWrapper>
        <HeaderOuter>
          <HeaderInner>
            <Link to="/">
              <h1>Book Store</h1>
            </Link>
          </HeaderInner>
        </HeaderOuter>
      </HeaderWrapper>
      {children}
    </>
  );
};
