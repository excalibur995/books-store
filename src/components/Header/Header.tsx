import React from "react";
import { IoMdArrowBack } from "react-icons/io";
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
  maxWidth: 1440,
  flexing: "row",
  alignItems: "center",
  margin: "0 auto",
  size: "100%",
  padding: "$24",
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
              <Link to="/">
                <h1>Book Store</h1>
              </Link>
            )}
          </HeaderInner>
        </HeaderOuter>
      </HeaderWrapper>
      {children}
    </>
  );
};
