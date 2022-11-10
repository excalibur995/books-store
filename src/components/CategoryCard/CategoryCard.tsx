import Typography from "components/Typography";
import { randomGradient } from "shared/utils";
import { styled } from "stitches.config";

const Wrapper = styled("div", {
  padding: "$8",
  borderRadius: "8px",
  minHeight: 56,
});
export const CategoryCard = ({
  name,
  onClick,
}: {
  name: string;
  onClick: () => void;
}) => {
  return (
    <Wrapper onClick={onClick} css={{ background: randomGradient() }}>
      <Typography variant="title" weight="semibold" css={{ color: "$neutral" }}>
        {name}
      </Typography>
    </Wrapper>
  );
};
