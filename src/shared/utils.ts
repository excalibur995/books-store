import { Book } from "domain/books/entities/books.entities";

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

export const seacrhBookFilter = (searchInput: string, data: Book[]) => {
  const filteredData = data.filter((value) => {
    const searchStr = searchInput.toLowerCase();
    const titleMatches = value.title.toLowerCase().includes(searchStr);
    const authorMatches = value.authors.some((item) =>
      item.toLowerCase().includes(searchStr)
    );

    return titleMatches || authorMatches;
  });

  return filteredData;
};
