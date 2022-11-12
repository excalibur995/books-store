import { Book } from "domain/books/entities/books.entities";

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
