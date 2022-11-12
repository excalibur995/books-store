import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { styled } from "stitches.config";

const BookMarkStarStyled = styled(AiFillStar, {
  fill: "$star",
});

type BookMarkStarProps = {
  isBookMarked?: boolean;
  size?: number;
  onClick?: () => void;
};

const BookMarkStar = ({ isBookMarked, ...rest }: BookMarkStarProps) => {
  return isBookMarked ? (
    <BookMarkStarStyled {...rest} />
  ) : (
    <AiOutlineStar fill="#000" {...rest} />
  );
};

export default BookMarkStar;
