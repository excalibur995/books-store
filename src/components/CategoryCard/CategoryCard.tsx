import Typography from "components/Typography";
import { styled } from "stitches.config";

const Wrapper = styled("div", {
  flexing: "row",
  alignItems: "center",
  padding: "$8",
  borderRadius: "6px",
  minHeight: 56,
  border: "thin solid $neutral",
  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
});

export const CategoryCard = ({
  name,
  onClick,
}: {
  name: string;
  onClick: () => void;
}) => {
  return (
    <Wrapper onClick={onClick}>
      <Typography variant="title" weight="semibold">
        {name}
      </Typography>
    </Wrapper>
  );
};
