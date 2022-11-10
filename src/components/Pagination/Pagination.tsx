import { styled } from "stitches.config";
import { BsChevronCompactLeft } from "react-icons/bs";
import { ComponentPropsWithoutRef } from "react";

type PaginationProps = {
  current: number;
  prevButtonProps?: ComponentPropsWithoutRef<"button">;
  nextButtonProps?: ComponentPropsWithoutRef<"button">;
};

const Wrapper = styled("div", {
  flexing: "row-center",
  gap: "$8",
});

const NextPrevButton = styled(BsChevronCompactLeft, {
  variants: {
    next: {
      true: {
        transform: "rotate(180deg)",
      },
    },
  },
});

const Buttons = styled("button", {
  all: "unset",
  padding: "$8",
  display: "flex",
  background: "$primary",
  borderRadius: "8px",
  cursor: "pointer",
  svg: {
    fill: "$neutral",
  },
  "&:active:not(:disabled)": {
    opacity: 0.5,
  },
  "&:disabled": {
    background: "$neutral_dark",
    cursor: "not-allowed",
  },
});

const Pagination = ({
  current,
  prevButtonProps,
  nextButtonProps,
}: PaginationProps) => {
  return (
    <Wrapper>
      <Buttons {...prevButtonProps}>
        <NextPrevButton size={15} />
      </Buttons>
      {current}
      <Buttons {...nextButtonProps}>
        <NextPrevButton next size={15} />
      </Buttons>
    </Wrapper>
  );
};

Pagination.defaultProps = {
  current: 0,
};
export default Pagination;
