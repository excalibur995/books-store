import { styled } from "stitches.config";
import { AiOutlineSearch, AiOutlineCloseCircle } from "react-icons/ai";
import { ComponentPropsWithoutRef, KeyboardEvent, useRef } from "react";
import { CSS } from "@stitches/react";

type InputProps = {
  wrapperCss?: CSS;
  onChangeEnter?: (input: string) => void;
  block?: boolean;
} & ComponentPropsWithoutRef<"input">;

const InputWrapper = styled("div", {
  flexing: "row",
  gap: "$8",
  width: "fit-content",
  padding: "$8",
  borderRadius: "6px",
  border: "thin solid $neutral",
  "&:focus-within": { borderColor: "#2684ff" },
  variants: {
    disabled: {
      true: {
        background: "$neutral",
        cursor: "not-allowed",
      },
    },
    block: {
      true: {
        width: "100%",
      },
    },
  },
});

const Input = styled("input", {
  border: "none",
  outline: "none",
  width: "100%",
  "&:disabled": {
    background: "$neutral",
    cursor: "not-allowed",
  },
});

const SearchInput = ({
  wrapperCss,
  onChangeEnter,
  disabled,
  ...rest
}: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && onChangeEnter) {
      const value = (event.target as HTMLInputElement).value;
      onChangeEnter && onChangeEnter(value);
    }
  };

  const onHandleClearButton = () => {
    if (!disabled) {
      if (inputRef.current) inputRef.current.value = "";
      onChangeEnter && onChangeEnter("");
    }
  };

  const onPressSearchIcon = () => {
    if (!disabled) {
      if (inputRef.current?.value)
        onChangeEnter && onChangeEnter(inputRef.current.value);
    }
  };

  return (
    <InputWrapper css={wrapperCss} disabled={disabled}>
      <AiOutlineSearch size={20} onClick={onPressSearchIcon} />
      <Input
        ref={inputRef}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        {...rest}
      />
      {inputRef.current?.value && (
        <AiOutlineCloseCircle size={20} onClick={onHandleClearButton} />
      )}
    </InputWrapper>
  );
};

export default SearchInput;
