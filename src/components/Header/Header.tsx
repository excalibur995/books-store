import React from "react";
import { IoMdArrowBack, IoMdSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import { styled } from "stitches.config";

const HeaderWrapper = styled("header", {
  width: "100%",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 99,
});

const SpaceBetween = styled("div", {
  flexing: "row-center",
  justifyContent: "space-between",
  width: "inherit",
});

const HeaderOuter = styled("section", {
  flexing: "column",
  justifyContent: "center",
  background: "$primary",
  height: 55,
  variants: {
    usingBackButton: {
      true: {
        "*": { color: "$neutral_dark", verticalAlign: "text-bottom" },
        svg: {
          margin: "0 $4",
        },
        background: "$neutral",
      },
    },
  },
});

const HeaderInner = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  margin: "0px auto",
  width: "-webkit-fill-available",
  height: "100%",
  padding: "$24",
  position: "relative",
  maxWidth: "1440px",
  variants: {
    usingBackButton: {
      true: {
        padding: "$8",
      },
    },
  },

  "*": { color: "$neutral" },
});

export interface HeaderProps {
  children: React.ReactNode;
  isUsingBackButton?: boolean;
  path?: string;
  title?: string;
  onClickBackButton?: () => void;
}

export const Header = ({
  children,
  isUsingBackButton,
  title,
  onClickBackButton,
}: HeaderProps) => {
  return (
    <>
      <HeaderWrapper>
        <HeaderOuter usingBackButton={isUsingBackButton}>
          <HeaderInner usingBackButton={isUsingBackButton}>
            {isUsingBackButton ? (
              <span onClick={onClickBackButton}>
                <IoMdArrowBack size={20} />
                {title}
              </span>
            ) : (
              <>
                <SpaceBetween>
                  <Link to="/">
                    <h1>Book Store</h1>
                  </Link>
                  <Link to="/search">
                    <IoMdSearch size={20} />
                  </Link>
                </SpaceBetween>
              </>
            )}
          </HeaderInner>
        </HeaderOuter>
      </HeaderWrapper>
      {children}
    </>
  );
};
