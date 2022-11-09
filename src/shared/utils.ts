export const randomColor = () => {
  let hexCode = "#";
  const hexString = "0123456789abcdef";
  for (let i = 0; i < 6; i++) {
    hexCode += hexString[Math.floor(Math.random() * hexString.length)];
  }
  return hexCode;
};

export const randomGradient = (
  colorOne: string = randomColor(),
  colorTwo: string = randomColor()
) => {
  const angle = Math.floor(Math.random() * 360);
  return `linear-gradient(${angle}deg, ${colorOne}, ${colorTwo})`;
};
